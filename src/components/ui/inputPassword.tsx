import * as React from "react"
import {useState} from "react"
import { cn } from "@/lib/utils"

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
  
const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [visibility,setVisibility] = useState("hidden");
    return (
      <>
      <div className="relative">
      <input
        type={`${visibility == "hidden"?"password":"string"}`}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none" className="w-4 h-4 absolute right-2 top-[calc(50%-0.5rem)]" onClick={()=>{
        if(visibility=="hidden"){
            setVisibility("visible")
        }else{
          setVisibility("hidden")
        }
      }}>
  <path d="M9.00188 9.14772C9.87667 9.14772 10.6196 8.84154 11.2307 8.22918C11.8418 7.61681 12.1474 6.87321 12.1474 5.99841C12.1474 5.12362 11.8412 4.38067 11.2289 3.76956C10.6165 3.15844 9.87289 2.85289 8.99809 2.85289C8.12329 2.85289 7.38034 3.15907 6.76923 3.77143C6.15812 4.3838 5.85256 5.1274 5.85256 6.0022C5.85256 6.87699 6.15874 7.61994 6.77111 8.23106C7.38348 8.84217 8.12707 9.14772 9.00188 9.14772ZM8.99998 8.00031C8.44443 8.00031 7.9722 7.80586 7.58331 7.41697C7.19443 7.02808 6.99998 6.55586 6.99998 6.00031C6.99998 5.44475 7.19443 4.97253 7.58331 4.58364C7.9722 4.19475 8.44443 4.00031 8.99998 4.00031C9.55554 4.00031 10.0278 4.19475 10.4166 4.58364C10.8055 4.97253 11 5.44475 11 6.00031C11 6.55586 10.8055 7.02808 10.4166 7.41697C10.0278 7.80586 9.55554 8.00031 8.99998 8.00031ZM9.00113 11.5836C7.13206 11.5836 5.42903 11.0759 3.89204 10.0604C2.35504 9.0449 1.20727 7.69154 0.44873 6.00031C1.20727 4.30907 2.35466 2.95571 3.8909 1.94022C5.42712 0.924736 7.12977 0.416992 8.99883 0.416992C10.8679 0.416992 12.5709 0.924736 14.1079 1.94022C15.6449 2.95571 16.7927 4.30907 17.5512 6.00031C16.7927 7.69154 15.6453 9.0449 14.1091 10.0604C12.5728 11.0759 10.8702 11.5836 9.00113 11.5836ZM8.99998 10.5003C10.5555 10.5003 11.993 10.0975 13.3125 9.29197C14.6319 8.48642 15.6458 7.38919 16.3541 6.00031C15.6458 4.61142 14.6319 3.51419 13.3125 2.70864C11.993 1.90308 10.5555 1.50031 8.99998 1.50031C7.44443 1.50031 6.00692 1.90308 4.68748 2.70864C3.36804 3.51419 2.35415 4.61142 1.64581 6.00031C2.35415 7.38919 3.36804 8.48642 4.68748 9.29197C6.00692 10.0975 7.44443 10.5003 8.99998 10.5003Z" fill="#1C1B1F"/>
</svg>
      </div>
      </>
    )
  }
)
InputPassword.displayName = "Input"

export { InputPassword }
