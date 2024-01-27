"use client"
import { Dispatch, createContext, useContext, useState } from "react"
// import { any } from "zod"

interface HContextProps {
  name: string | undefined
  setName: Dispatch<any>
}

export const HeaderContext = createContext({} as HContextProps)
export const HeaderContextProvider = ({ children }: any) => {
  const [name, setName] = useState()
  return (
    <HeaderContext.Provider value={{ name: name, setName: setName }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = () => {
  return useContext(HeaderContext)
}
