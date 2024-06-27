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
import { auth, db, googleProvider } from "@/lib/firebase"
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
})
import Swiper from "./Swiper"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputPassword } from "@/components/ui/inputPassword"
import { AuthContext } from "../context/AuthContext"
import {
  Timestamp,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [error, setError] = useState<undefined | string>()
  const { current, dispatch } = useContext(AuthContext)
  const router = useRouter()

  // Function to generate a UID from an email address
  function generateUID(email: string) {
    return email.replace(/[^a-zA-Z0-9]/g, "_")
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      const uid = generateUID(values.email)
      dispatch({ type: "LOGIN", payload: uid })
      await setDoc(doc(db, "users", uid), {
        uid,
        email: res.user.email,
        timestamp: serverTimestamp(),
      })
      router.push("/profile-editor")
    } catch (error: any) {
      setError(error.message)
    }
  }

  async function googleAuth() {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user
        const uid = generateUID(user.email || user.uid)
        dispatch({ type: "LOGIN", payload: uid })
        let docRef = doc(db, "users", uid)
        const docResult = await getDoc(docRef)
        if (!docResult.exists()) {
          await setDoc(doc(db, "users", uid), {
            uid,
            email: user.email,
            timestamp: serverTimestamp(),
          })
        }
        setError(undefined)
        router.push("/profile-editor")
      })
      .catch((error) => {
        setError(error.message)
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
            <h2 className="text-[1.75rem] font-bold">Welcome to Smortr!</h2>
            <p className="w-[25rem] mt-[0.75] text-[#848484] text-[0.75rem]">
              You are a few clicks away from the next big revolution in the
              building design industry.
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
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Email Id</FormLabel>
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
              <p className="text-[#848484] text-xs mt-16 text-center">
                Already have an account?{" "}
                <a href="/signup" className="text-[#482DB1]">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
