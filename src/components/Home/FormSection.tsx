"use client";

import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { NumericInputs } from "../shared/NumericInputs";
import { Button } from "../core/Button";

import { useState } from "react";
import { BottomSheet } from "../shared/BottomSheet";

export function FormSection() {
  const methods = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const submitHandler = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        <NumericInputs />
        <div className="self-start pt-5">
          <p className="text-md pb-2">آدرس جهت درج روی بیمه‌نامه</p>
          <p className="text-sm">
            لطفا آدرسی که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید
          </p>
        </div>
        <div className="w-full">
          <Button
            onClick={() => setIsOpen(true)}
            className="py-2 rounded w-full"
          >
            انتخاب از آدرس‌های من
          </Button>
        </div>
        <Button type="submit" color="black" className="self-end">
          تایید و ادامه
        </Button>
      </form>
      <BottomSheet
        headerTitle="انتخاب آدرس"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div>
          <p>First Sheet</p>
        </div>
      </BottomSheet>
    </FormProvider>
  );
}
