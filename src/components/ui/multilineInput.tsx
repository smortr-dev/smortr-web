import * as React from "react";
import { useFormField } from "./form";
import { cn } from "@/lib/utils";
import { Rows } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  rows: number;
  maxLength: number;
}

const MultiLineInput = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, type, placeholder, rows, maxLength, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    return (
      <>
        <div className="relative">
          <textarea
            maxLength={maxLength}
            // rows={3}
            rows={rows}
            // type={type}
            className={`${cn(
              "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )} resize-none`}
            placeholder={placeholder}
            ref={ref}
            {...props}
            // placeholder="Example: I design large living areas in tiny spaces."
          />
          <span className="absolute bottom-2 right-2 text-[0.625rem] text-[#848484]">
            {(props.value ? props.value : "").toString().length}/ {maxLength}
          </span>
        </div>
      </>
    );
  }
);
MultiLineInput.displayName = "Input";

export { MultiLineInput };
