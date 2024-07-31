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
import Link from "next/link"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  })
  const [error, setError] = useState<string | undefined>()
  const { dispatch, current } = useContext(AuthContext)
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signInWithEmailAndPassword(auth, values.emailOrPhone, values.password)
      .then((userCredential) => {
        const user = userCredential.user
        setError(undefined)
        dispatch({ type: "LOGIN", payload: user.uid })
        router.push("/profile-editor")
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  async function googleAuth() {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)!
        const token = credential.accessToken
        const user = result.user
        console.log(user)

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
        setError(error.message)
      })
  }

  return (
    <>
      <div className="flex justify-center items-center p-10">
        <div className="flex justify-center ">
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-sans font-semibold text-center p-3">
              Login to your Smortr account
            </h2>
            <div className="flex flex-col p-2 justify-center  w-96 gap-3">
              <div
                className="flex flex-row gap-3 justify-center items-center w-[34rem] border-[#BDBDBD] border-2 h-14 rounded-full hover:cursor-pointer hover:bg-gray-100"
                onClick={googleAuth}
              >
                <Image src="/google.png" alt="Google" width={28} height={28} />
                <p>Continue with Google</p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center w-[34rem] border-[#BDBDBD] border-2 h-14 rounded-full hover:cursor-pointer hover:bg-gray-100">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={32}
                  height={32}
                />
                <p>Continue with Facebook</p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center w-[34rem] border-[#BDBDBD] border-2 h-14 rounded-full hover:cursor-pointer hover:bg-gray-100">
                <Image src="/apple.png" alt="Apple" width={32} height={32} />
                <p>Continue with Apple</p>
              </div>
            </div>
            <div className="p-2 mt-2 text-[#848484] text-special text-lg font-bold w-[35rem] text-center">
              OR
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
                      <FormItem className="flex flex-col p-2">
                        <FormLabel className="text-[#666666] mb-2">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className={`rounded-xl w-[34rem] ${
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
                      <FormItem className="flex flex-col p-2">
                        <FormLabel className="text-[#666666] mb-2">
                          Password
                        </FormLabel>
                        <FormControl className="relative">
                          <InputPassword
                            {...field}
                            className="rounded-xl w-[34rem]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    className="flex justify-end mt-1 font-bold"
                    href={"/forgot-password"}
                  >
                    Forgot your password?
                  </Link>
                  <div className="flex items-center space-x-2 p-3">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep me signed in until I sign out
                    </label>
                  </div>
                  {error ? (
                    <div className="text-xs text-[#CC3057]">{error}</div>
                  ) : null}
                  <Button
                    type="submit"
                    className="hover:text-white hover:border-2 hover:bg-[#1769ff] hover:border-black text-white bg-[#BDBDBD] w-[34rem] rounded-full h-12"
                  >
                    Log In
                  </Button>
                </form>
              </Form>

              {/* <a className="text-[#482DB1] underline text-xs mt-8 block text-center">
                Forgot Password?
              </a> */}
              {/* <div className="p-2 mt-2 text-[#848484] text-special text-lg font-bold w-[35rem] text-center"> */}

              <hr className="border-[#848484] border-opacity-100 mt-7 w-[35rem]" />
              <p className="p-2 text-center text-md my-3 ">
                Don&apos;t have an account?
              </p>
              <Link href={"/signup"}>
                <Button
                  type="submit"
                  className="text-black border-2 bg-gray-100 border-black hover:text-white  w-[34rem] rounded-full h-12"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
