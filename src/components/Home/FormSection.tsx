"use client";

import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { NumericInputs } from "../shared/NumericInputs";
import { Button } from "../core/Button";
import { AddressField } from "./AddressField";

export function FormSection() {
  const methods = useForm();

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
        <AddressField methods={methods} />
        <Button type="submit" color="black" className="self-end">
          تایید و ادامه
        </Button>
      </form>
    </FormProvider>
  );
}
