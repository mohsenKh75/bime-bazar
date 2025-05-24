import { Spinner } from "./Spinner";
import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "filled" | "outlined";
type ButtonColor = "yellow" | "black" | "gray";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  pending?: boolean;
}

const COLORS_VARIANTS = {
  yellow: {
    filled: "bg-amber-400 text-black",
    outlined: "border border-amber-400 text-amber-400 bg-transparent",
  },
  black: {
    filled: "bg-black text-white",
    outlined: "border border-black text-black bg-transparent",
  },
  gray: {
    filled: "bg-gray-600 text-white",
    outlined: "border border-gray-600 text-gray-600 bg-transparent",
  },
  disabled: {
    filled: "bg-gray-200 text-white cursor-not-allowed",
    outlined:
      "border border-gray-400 text-gray-400 bg-transparent cursor-not-allowed",
  },
};

export function Button({
  children,
  variant = "filled",
  color = "yellow",
  pending = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}: Props) {
  const isDisabled = disabled || pending;
  const styles = isDisabled
    ? COLORS_VARIANTS.disabled[variant]
    : COLORS_VARIANTS[color][variant];

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all ${styles} ${className}`}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {pending ? <Spinner /> : children}
    </button>
  );
}
