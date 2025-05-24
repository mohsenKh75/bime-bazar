import { classnames } from "@/utils/classNames";
import React, {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  onClick?: () => void;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}
export function Input({
  type,
  placeholder,
  id,
  register,
  error,
  onClick,
  inputProps,
}: Props) {
  return (
    <div className="w-full relative">
      <input
        {...inputProps}
        onClick={onClick}
        dir="rtl"
        {...register}
        type={type}
        placeholder={placeholder}
        id={id}
        className={classnames("w-full h-10 px-2 border-slate-400 border", {
          "caret-transparent": inputProps?.readOnly,
        })}
      />
      {error && <p className="text-sm pt-2 text-red-400">*{error}</p>}
    </div>
  );
}
