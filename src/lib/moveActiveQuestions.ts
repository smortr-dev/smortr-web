import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

export async function moveActiveQuestions(userId: string, projectId: string) {
  // const userSnap = doc(db, "users", user )
  const projectRef = doc(db, "users", userId, "projects", projectId)
  const projectSnap = await getDoc(projectRef)
  if (projectSnap.exists()) {
    const data = projectSnap.data()
    let arrayToAdd: any[] = []
    if (data.questions && data.answer) {
      data.questions.map((question: string, index: number) => {
        if (data.answer[index]) {
          let obj = {
            question: question,
            answer: data.answer,
          }
          arrayToAdd.push(obj)
        }
      })
      await updateDoc(projectRef, {
        answered_questions: arrayUnion(arrayToAdd),
        questions: [],
        answer: [],
      })
    }
    // if()
  }
}
