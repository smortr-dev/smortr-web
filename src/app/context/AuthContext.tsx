"use client"
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
  Dispatch,
} from "react"
import AuthReducer from "./AuthReducer"
interface IContextProps {
  current: string | undefined | null
  dispatch: Dispatch<any>
}

let INITIAL_STATE: any
if (typeof window !== "undefined") {
  INITIAL_STATE = {
    currentUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  }
} else {
  INITIAL_STATE = {
    currentUser: null,
  }
}
export const AuthContext = createContext({} as IContextProps)
export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser))
  }, [state.currentUser])
  return (
    <AuthContext.Provider value={{ current: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
export const UserAuth = () => {
  return useContext(AuthContext)
}
