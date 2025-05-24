"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../core/Input";
import {
  validateNationalCode,
  validatePhoneNumber,
} from "@/utils/formValidators";

export function NumericInputs() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <Input
        type="tel"
        id="nationalCode"
        placeholder="کد ملی"
        error={errors?.nationalCode?.message as string}
        register={register("nationalCode", {
          required: "وارد کردن کد ملی الزامی است",
          validate: validateNationalCode,
        })}
      />
      <Input
        type="tel"
        id="phoneNumber"
        placeholder="شماره موبایل"
        error={errors?.phoneNumber?.message as string}
        register={register("phoneNumber", {
          required: "وارد کردن شماره تلفن الزامی است",
          validate: validatePhoneNumber,
        })}
      />
    </div>
  );
}
