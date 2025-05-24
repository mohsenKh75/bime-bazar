"use client";

import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  name: string;
  required?: boolean;
}

export function RadioButton({ value, name, disabled, ...rest }: Props) {
  const { watch, setValue } = useFormContext();
  const isActive = watch(name) === value;

  return (
    <div>
      <input
        type="radio"
        value={value}
        disabled={disabled}
        onChange={() => setValue(name, value)}
        {...rest}
        className="hidden peer"
      />
      {isActive ? (
        <Image width={16} height={16} src="radioOn.svg" alt="radio" />
      ) : (
        <Image src="radioOff.svg" width={16} height={16} alt="radio" />
      )}
    </div>
  );
}
