/* eslint-disable @next/next/no-img-element */
"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
// export function ProfileForm() {}
import { auth, db, googleProvider } from "@/lib/firebase"

const formSchema = z.object({
  emailOrPhone: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
})
import Swiper from "./Swiper"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputPassword } from "@/components/ui/inputPassword"
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { AuthContext } from "../context/AuthContext"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  })
  const [error, setError] = useState<string | undefined>()
  const { dispatch, current } = useContext(AuthContext)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signInWithEmailAndPassword(auth, values.emailOrPhone, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setError(undefined)
        dispatch({ type: "LOGIN", payload: user.uid })
        router.push("/profile-editor")
        // console.log(user)
      })
      .catch((error) => {
        setError(error.message)
      })
  }
  const router = useRouter()
  async function googleAuth() {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)!
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        let docRef = doc(db, "users", user.uid)
        dispatch({ type: "LOGIN", payload: user.uid })
        const docResult = await getDoc(docRef)
        if (!docResult.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            timestamp: serverTimestamp(),
          })
        }
        setError(undefined)
        router.push("/profile-editor")
      })

      .catch((error) => {
        // Handle Errors here.
        setError(error.message)
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }
  return (
    <>
      <div className="flex flex-row ">
        <div className="w-[50%]">
          <Swiper style={{ height: "100vh" }} />
        </div>
        <div className="w-[50%] flex justify-center self-center">
          <div>
            <h2 className="text-[1.75rem] font-bold">Welcome Back!</h2>
            <p className="w-[25rem] mt-[0.75] text-[#848484] text-[0.75rem]">
              You’re a few clicks away from unlocking opportunities and building
              a better future.{" "}
            </p>
            <div className="my-[2.5rem] block">
              <div className="cursor-pointer rounded-[50%] h-[3.5rem] w-[3.5rem] bg-[#1A1A1A] border-black border-[2px] flex justify-center self-center float-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-2.258175 -4.620225 19.57085 27.72135"
                >
                  <path
                    fill="#fff"
                    d="M7.6445 5.31c-.73 0-1.86-.83-3.05-.8-1.57.02-3.01.91-3.82 2.32-1.63 2.83-.42 7.01 1.17 9.31.78 1.12 1.7 2.38 2.92 2.34 1.17-.05 1.61-.76 3.03-.76 1.41 0 1.81.76 3.05.73 1.26-.02 2.06-1.14 2.83-2.27.89-1.3 1.26-2.56 1.28-2.63-.03-.01-2.45-.94-2.48-3.74-.02-2.34 1.91-3.46 2-3.51-1.1-1.61-2.79-1.79-3.38-1.83-1.54-.12-2.83.84-3.55.84zm2.6-2.36c.65-.78 1.08-1.87.96-2.95-.93.04-2.05.62-2.72 1.4-.6.69-1.12 1.8-.98 2.86 1.03.08 2.09-.53 2.74-1.31"
                  />
                </svg>
              </div>
              <div
                className="cursor-pointer rounded-[50%] h-[3.5rem] w-[3.5rem] bg-white ml-[2.25rem] flex justify-center items-center border-black border-[2px] float-left"
                onClick={googleAuth}
              >
                <img
                  src="/google.png"
                  alt="google"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "inline-block",
                  }}
                />
              </div>
              <div className="cursor-pointer rounded-[50%] h-[3.5rem] w-[3.5rem] bg-white ml-[2.25rem] border-black border-[2px] flex justify-center self-center float-left">
                <img src="/facebook.png" alt="facebook" />
              </div>
            </div>
            <div className="mt-[8rem] text-[#848484] text-special text-xs">
              Or
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="emailOrPhone"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Email Id or Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className={`rounded-[0.38rem] ${
                              fieldState.error
                                ? "border-[#CC3057] border-2"
                                : ""
                            }`}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-[#CC3057]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl className="relative">
                          <InputPassword
                            {...field}
                            className="rounded-[0.38rem]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error ? (
                    <div className="text-xs text-[#CC3057]">{error}</div>
                  ) : null}
                  <Button
                    type="submit"
                    className="hover:text-black hover:border-2 hover:bg-gray-100 hover:border-black text-white bg-black w-[100%] rounded-[0.38rem]"
                  >
                    Continue
                  </Button>
                </form>
              </Form>
              <a className="text-[#482DB1] underline text-xs mt-8 block">
                {" "}
                Forgot Password?
              </a>
              <p className="text-[#848484] text-xs mt-16 text-center">
                Don’t have an account? Sign up{" "}
                <a className="text-[#482DB1]">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  // return(<>
  // hello</>)
}
