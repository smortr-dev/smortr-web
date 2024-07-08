import { db } from "@/lib/firebase";
import { openai } from "@/lib/openai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const maxDuration = 60;
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  //const startTime = Date.now();
  try {
    const data = await request.formData();
    const files = data.getAll('file') as File[];
    const userId = data.get('userId') as string | null;
    const projectId = data.get('projectId') as string | null;
    const fileURLs = JSON.parse(data.get('fileURL') as string);

    if (!files.length) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    if (!userId || !projectId) {
      return NextResponse.json({ error: 'userId or projectId not provided' }, { status: 400 });
    }

    // Get project document
    const projectRef = doc(db, "users", userId, "projects", projectId);
    const projectSnapshot = await getDoc(projectRef);

    if (!projectSnapshot.exists()) {
      return NextResponse.json({ error: 'Project does not exist' }, { status: 404 });
    }

    const projectData = projectSnapshot.data();
    const vectorStoreId = projectData.vectorStoreId;
    const threadId = projectData.thread_id;

    if (!vectorStoreId) {
      return NextResponse.json({ error: 'Vector store ID not found in project' }, { status: 400 });
    }

    // Separate PDF and image files
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    // Process PDF files
    let temp1: any = {};
    if (pdfFiles.length > 0) {
      await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, { files: pdfFiles });

      const run = await openai.beta.threads.runs.createAndPoll(threadId, {
        assistant_id: "asst_ccbddQvI5ApkNmT6NfwDcG0W",
        model: "gpt-4o",
        instructions: `Narrative Crafter, now incorporating web and knowledge base resources, is tailored for a more in-depth exploration of building design projects. The assistant should only respond once with each user message or file upload and the response should strictly be in JSON format, written in past tense, comprises five attributes: 'Context', 'Conflict', 'Resolution', 'Reaction' and 'Question'. 'Context' refers to the internal and external influences on the project before the design solution. 'Conflict' covers the problem statement or project brief. 'Resolution' describes the design solution, showcasing how it considers the context and solves the conflict. 'Reaction' details the feedback, reactions, or metrics used to measure the solution's effectiveness. Initial user message will contain some context of the project for your reference. The user response is in JSON format with an array of objects with question and answer attributes. GPT incorporates the question and corresponding answer to the existing narrative making edits to accommodate the new information and formulate new questions to better understand the overall project and enrich the context, conflict, resolution and reaction in the further responses. The questions that should be within the 'Question' attribute array of the output should be carefully crafted such that any missing information on context, conflict, resolution and reaction can be mitigated and improved. The output should always be in JSON format, each attribute apart from 'Question' should be set to strings with the relevant generated content. The 'Question' attribute in the output JSON object should be strictly an array of ten strings which correspond to the relevant questions generated. There should only be one response from the assistant per every user message. If there is a file uploaded it should be analysed and the information should be used to enrich the narrative and for framing questions.`,
        tools: [{ type: "file_search" }],
      });

      const messages = await openai.beta.threads.messages.list(threadId, {
        run_id: run.id,
      });

      const message = messages.data.pop();
      if (message && message.content[0].type === "text") {
        const { text } = message.content[0];
        const cleanedText = text.value
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
      

        try {
          temp1 = JSON.parse(cleanedText);
          console.log('temp1:', temp1);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return NextResponse.json({ error: 'Failed to parse JSON response' }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: 'No valid message content found' }, { status: 400 });
      }
    }

    // Process image files
    let temp2: any[] = [];
    for (const url of fileURLs) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: `Narrative Crafter, now incorporating web and knowledge base resources, is tailored for a more in-depth exploration of building design projects. The assistant should only respond once with each user message or file upload and the response should strictly be in JSON format, written in past tense, comprises five attributes: 'Context', 'Conflict', 'Resolution', 'Reaction' and 'Question'. 'Context' refers to the internal and external influences on the project before the design solution. 'Conflict' covers the problem statement or project brief. 'Resolution' describes the design solution, showcasing how it considers the context and solves the conflict. 'Reaction' details the feedback, reactions, or metrics used to measure the solution's effectiveness. Initial user message will contain some context of the project for your reference. The user response is in JSON format with an array of objects with question and answer attributes. GPT incorporates the question and corresponding answer to the existing narrative making edits to accommodate the new information and formulate new questions to better understand the overall project and enrich the context, conflict, resolution and reaction in the further responses. The questions that should be within the 'Question' attribute array of the output should be carefully crafted such that any missing information on context, conflict, resolution and reaction can be mitigated and improved. The output should always be in JSON format, each attribute apart from 'Question' should be set to strings with the relevant generated content. The 'Question' attribute in the output JSON object should be strictly an array of ten strings which correspond to the relevant questions generated. There should only be one response from the assistant per every user message. If there is a file uploaded it should be analysed and the information should be used to enrich the narrative and for framing questions.` 
              },
              {
                type: "image_url",
                image_url: { url },
              },
            ],
          },
        ],
      });

      let visionData: any = response.choices[0].message.content;
      console.log('visionData:', visionData);
      try {
        let jsonObject;
        //let jsonResponse = response.choices[0].message.content;
        if (visionData !== null) {
            visionData = visionData.replace(/```json\n|```/g, ''); // Remove the ```json and ``` from the response

            // Parse the JSON string into an object
            jsonObject = JSON.parse(visionData);
        }

        temp2.push(JSON.parse(visionData));
      } catch (error) {
        console.error('Error parsing vision JSON:', error);
        return NextResponse.json({ error: 'Failed to parse vision JSON response' }, { status: 500 });
      }
    }

    // Combine temp1 and temp2
    const combinedData = { ...temp1, temp2 };

    // Ensure the directory exists before writing the file
    const tmpDir = path.join(__dirname, 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
    const filePath = path.join(tmpDir, 'combinedData.json');
    fs.writeFileSync(filePath, JSON.stringify(combinedData));
    console.log('The combinedData',combinedData);


    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    const thread = await openai.beta.threads.create({
      messages: [
          {
              role: "user",
              content: "Follow the instructions of the assistant and return the output in JSON",
              attachments: [
                  {
                      file_id: file.id,
                      tools: [{ type: "file_search" }]
                  }
              ]
          }
      ]
  });
    // Run the final thread
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: "asst_lkry8zt5Z1n4d2fhtBVuA1A3",
      model: "gpt-4o",
      instructions: `You are provided with a json file which has one or more than one set of information with labels Conflict, Context, Resolution, Reactions, Questions. You are to go over all this information and give out a json object only containing all the labels with summarized information.
Sample Json :
{
      Context: 'The project focuses on revitalizing the Triulzo Superiore community in Milan, aiming to transform it into a socially inclusive and adaptive zone by enhancing multiculturalism and addressing social exclusion.',
      Conflict: "The area of Triulzo Superiore is socially excluded from the larger urban area, leading to deteriorating spaces, public safety concerns, and reduced economic vitality. The challenge is to reverse the negative perception of Triulzo Superiore as a 'borderland' and stimulate economic development while fostering social inclusivity and multiculturalism.",
      Resolution: 'The project proposed a community Vision Plan to transform Triulzo Superiore into an enhanced borderland, Borderland+, by revitalizing its physical and social dimensions, enhancing multiculturalism, and promoting social inclusion. The framework included a mission to revitalize the area and three overarching goals targeting different aspects of the study area. Strategies and specific actions were developed, ranging from light, quick interventions to infrastructure improvements, to address social exclusion and promote economic vitality.',
      Reaction: 'The project involved extensive GIS analysis, physical interventions, public participation workshops, interactions with government actors, policy analysis, and the submission of reports to the municipality and academic journals. The proposed interventions aimed to strengthen local multicultural identity, create recreation opportunities, enhance natural elements, increase public safety, stimulate economic development, and establish a sustainable mobility district.',
      Question: [Array]
    },
    {
      Context: 'The hospital sought to create a more serene and soothing environment in its maternity ward to enhance the overall experience of patients and their families. This was influenced by growing research suggesting that aesthetically pleasing and calming environments can positively impact patient recovery and mental health.',
      Conflict: 'The challenge was to transform a conventional, clinical-looking maternity ward into a space that felt more welcoming and comforting without compromising on the necessary medical functionalities and hygiene standards.',
      Resolution: 'The design solution involved incorporating elements of nature through murals and soft furnishings, optimizing natural lighting, and using a color palette that evoked calmness. The use of green hues, nature-inspired artwork, and comfortable furniture aimed to create a homely and peaceful atmosphere.',
      Reaction: 'Feedback from patients and staff has been overwhelmingly positive. Patients reported feeling more relaxed and less anxious, while staff noted an improvement in the overall mood and well-being of the patients. The hospital recorded a decrease in patient stress levels, illustrating the effectiveness of the design.',
      Question: [Array]
    },
    {
      Context: 'The project aimed to redesign a hospital room to enhance patient comfort and well-being. The focus was on creating a more pleasant and calming environment while adhering to hospital safety standards. This room was initially plain, utilitarian, and lacked aesthetic appeal.',
      Conflict: "The primary problem was the existing hospital room's sterile and uninviting atmosphere, which could potentially affect patient morale and recovery times. The challenge was to introduce elements that would make the space feel welcoming and soothing without compromising the functional requirements of a hospital setting.",
      Resolution: "The design solution included the introduction of a mural depicting tropical leaves and a bird, evoking a sense of nature and tranquility. In addition, simple yet elegant curtains were added to soften the room's look while maintaining privacy and light control. The artwork and decor were carefully selected to be non-intrusive and align with health regulations.",
      Reaction: 'Initial feedback from both patients and staff was overwhelmingly positive. Patients reported feeling more relaxed and uplifted by the new environment. Hospital staff noticed an improvement in patient attitude and a slight boost in overall morale, suggesting the design changes were effective.',
      Question: [Array]
    }
  ]
}

Required Output(Return only the JSON object please refrain from using phrases such as 'here is the output' or 'sure the output is' or anything along those lines)
Context: All the repeated Contexts of the provided json(not the sample example provided above) combined and summarized into a meaningful context.
Conflict: All the repeated Conflicts of the provided json(not the sample example provided above) combined and summarized into a meaningful conflict.
Resolution: All the repeated Resolution of the provided json(not the sample example provided above) combined and summarized into a meaningful resolution.
Reaction:  All the repeated Reaction of the provided json(not the sample example provided above) combined and summarized into a meaningful reaction.
Question: Top 9-10 questions from the set of all questions in the json to be selected.

`,
      tools: [{ type: "file_search"}],
    });

    const messages = await openai.beta.threads.messages.list(thread.id, {
      run_id: run.id,
    });

    
    const finalMessage = messages.data.pop();
    console.log('finalMessage:', finalMessage);
    if (finalMessage && finalMessage.content[0].type === "text") {
      const { text } = finalMessage.content[0];
      const cleanedText = text.value
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
    console.log('cleanedText:', cleanedText);
      let combinedResult;
      try {
        combinedResult = JSON.parse(cleanedText);
        console.log('combinedResult:', combinedResult);
      } catch (error) {
        console.error('Error parsing combined JSON:', error);
        return NextResponse.json({ error: 'Failed to parse combined JSON response' }, { status: 500 });
      }

      // Upload the combined result to Firebase
      await updateDoc(projectRef, {
        Context: combinedResult.Context,
        Conflict: combinedResult.Conflict,
        Resolution: combinedResult.Resolution,
        Reaction: combinedResult.Reaction,
        questions: combinedResult.Question,
      });
      //const endTime = Date.now();

      return NextResponse.json({ success: true, response: combinedResult });
    } else {
      return NextResponse.json({ error: 'No valid message content found' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
