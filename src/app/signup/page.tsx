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
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

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
        values.password,
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
      <div className="flex justify-center items-center p-10">
        <div className="flex justify-center ">
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-sans font-semibold text-center p-3">
              Create your Smortr account
            </h2>
            <div className="flex flex-col p-2 justify-center  w-96 gap-3">
              <div
                className="flex flex-row gap-3 justify-center items-center w-[34rem] border-[#BDBDBD] border-2 h-14 rounded-full hover:cursor-pointer hover:bg-gray-100"
                onClick={googleAuth}
              >
                <Image src="/google.png" alt="Google" width={28} height={28}/>
                <p>Sign up with Google</p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center w-[34rem] border-[#BDBDBD] border-2 h-14 rounded-full hover:cursor-pointer hover:bg-gray-100">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={32}
                  height={32}
                />
                <p>Sign up with Facebook</p>
              </div>
              <div className="flex flex-row gap-3 justify-center items-center w-[34rem] border-[#BDBDBD] border-2 h-14 rounded-full hover:cursor-pointer hover:bg-gray-100">
                <Image src="/apple.png" alt="Google" width={32} height={32} />
                <p>Sign up with Apple</p>
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
                    name="email"
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
                    className="hover:text-black hover:border-2 hover:bg-gray-100 hover:border-black text-white bg-[#BDBDBD] w-[34rem] rounded-full h-12"
                  >
                    Sign up
                  </Button>
                </form>
              </Form>
              <hr className="border-[#848484] border-opacity-100 mt-7 w-[35rem]" />
              <p className="p-2 text-center text-md my-3 ">
                Already have an account?
              </p>
              <Link href={"/login"}>
                <Button
                  type="submit"
                  className="text-black border-2 bg-gray-100 border-black hover:text-white  w-[34rem] rounded-full h-12"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
