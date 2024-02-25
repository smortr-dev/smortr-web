import { Run } from "openai/resources/beta/threads/runs/runs.mjs"
import { openai } from "./openai"
import {
  ThreadMessage,
  ThreadMessagesPage,
} from "openai/resources/beta/threads/messages/messages.mjs"
import { PagePromise } from "openai/core.mjs"
function checkRunStatus(run_id: string, thread_id: string) {
  return new Promise<Run>((res, rej) => {
    openai.beta.threads.runs
      .retrieve(thread_id.toString(), run_id.toString())
      .then((run) => {
        res(run)
      })
      .catch((err) => {
        rej(err)
      })
    //   rej()
    // res("");
    // rej("");
  })
}

async function sendMessage(
  thread_id: string,
  assistant_id: string,
  message: string,
) {
  const message_gpt = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: message,
  })

  return new Promise<PagePromise<ThreadMessagesPage, ThreadMessage>>(
    (resolve, reject) => {
      // let run = null;
      const innerPromise = new Promise((resolve_inner, reject_inner) => {
        openai.beta.threads.runs
          .create(thread_id, {
            assistant_id: assistant_id,
          })
          .then((run_init) => {
            //   var run = run_init;
            // let status = true
            //   setTimeout(() => {
            // while (status) {
            console.log("loop")

            function recursiveCheckStatus(num: number): Promise<Run> {
              return new Promise((res, rej) => {
                if (num > 0) {
                  setTimeout(() => {
                    console.log("timeout", num)
                    checkRunStatus(run_init.id, thread_id).then((run) => {
                      // resolve_inner()
                      if (run.status == "in_progress") {
                        recursiveCheckStatus(num - 1).then((run) => {
                          res(run)
                        })
                      } else if (run.status == "completed") {
                        res(run)
                      } else {
                        rej(new Error("an Error occured"))
                      }
                    })
                  }, 1000)
                } else {
                  rej(new Error("Took too many calls"))
                }
              })
            }

            recursiveCheckStatus(20)
              .then((run) => {
                resolve_inner(run)
              })
              .catch((err) => {
                console.log(err)
                reject_inner(err)
              })

            // setTimeout(() => {
            //   try {
            //     checkRunStatus(run_init.id, thread_id).then((run_check) => {
            //       if (run_check.status == "in_progress") {
            //         console.log(run_check, "run_check");
            //         //   resolve_inner(run_check);
            //       } else if (run_check.status == "completed") {
            //         status = false;
            //         //   break;
            //         resolve_inner(run_check);
            //       } else {
            //         reject_inner(new Error("Rejected Inner"));
            //       }
            //     });
            //   } catch (err) {
            //     reject_inner(
            //       new Error("Threw an error while running loop for api call")
            //     );
            //   }
            // }, 10000);
            // }
            //   }, 10000);
            //   reject_inner(new Error("Took Too much time"));
          })
          .catch((err) => {
            console.log(err)
            reject_inner("Run init Api call error")
          })
      })

      innerPromise
        .then((run) => {
          console.log(run, "run")
          resolve(openai.beta.threads.messages.list(thread_id))
          // resolve(run);
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      // .then((thread_out) => {
      //   console.log(thread_out, "message")
      //   resolve(thread_out)
      // })
      // .catch((error) => {
      //   console.log("error thrown")
      //   reject(error)
      // }) // while (true){

      // }
    },
  )
  //   } catch (err) {
  //     console.log(err, "Error")
  //   }
}

export { sendMessage }
