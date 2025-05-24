"use client";

import { classnames } from "@/utils/classNames";
import Image from "next/image";
import React, { useState } from "react";
import { RadioButton } from "../../core/RadioButton";
import { BottomSheet } from "../../shared/BottomSheet";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  name: string;
  description?: string;
  className?: string;
  onRemoveClick: (id: string) => void;
  required?: boolean;
}

export function AddressItem({
  label,
  value,
  name,
  description,
  className,
  onRemoveClick,
  required,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <label
        className={classnames(
          "flex items-start gap-2 cursor-pointer text-sm relative",
          className
        )}
      >
        <RadioButton name={name} value={value} required={required} />
        <div className="w-full">
          <div className="flex justify-between">
            <p className="text-gray-800 text-md peer-disabled:text-gray-400">
              {label}
            </p>
            <Image
              onClick={() => setIsOpen(true)}
              src="vector.svg"
              width={10}
              height={10}
              alt="close"
            />
          </div>
          {description && (
            <p className="text-sm text-gray-600 block">{description}</p>
          )}
        </div>
      </label>
      <BottomSheet
        headerTitle="حذف آدرس"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        hasTwoOptionsFooter
        footerCloseCallback={() => {
          setIsOpen(false);
          onRemoveClick(value);
        }}
      >
        <p className="text-md pb-2">آیا از حذف این آدرس مطمئن هستید؟</p>
        <div className="bg-gray-200 rounded-md p-2">
          <p className="text-md">{label}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </BottomSheet>
    </>
  );
}
