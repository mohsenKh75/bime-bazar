"use client";

import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { NumericInputs } from "../shared/NumericInputs";
import { Button } from "../core/Button";
import { AddressField } from "./AddressField";
import { useApi } from "@/hooks/useApi";
import { POST_ORDER_DATA } from "@/apis/home/endpoints";
import { useState } from "react";
import { BottomSheet } from "../shared/BottomSheet";
import { useRouter } from "next/navigation";

export function FormSection() {
  const methods = useForm();
  const { request: requestPostData, pending: pendingPostData } = useApi({
    ep: POST_ORDER_DATA,
  });
  const [isErrorBottomSheetOpen, setIsErrorBottomSheetOpen] = useState(false);
  const router = useRouter();
  const submitHandler = (data: FieldValues) => {
    const formData = {
      nationalId: data?.nationalCode,
      phoneNumber: data?.phoneNumber,
      addressId: data?.addressOptions,
    };
    requestPostData({
      method: "POST",
      payload: formData,
    })
      .then(() => router.push("/success-order"))
      .catch(() => setIsErrorBottomSheetOpen(true));
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        <NumericInputs />
        <AddressField methods={methods} />
        <Button
          type="submit"
          color="black"
          className="self-end"
          pending={pendingPostData}
        >
          تایید و ادامه
        </Button>
      </form>
      <BottomSheet
        isOpen={isErrorBottomSheetOpen}
        onClose={() => setIsErrorBottomSheetOpen(false)}
        hasTwoOptionsFooter
        footerCloseCallback={methods.handleSubmit(submitHandler)}
        isClosePrevented
        isFooterButtonDisabled={pendingPostData}
      >
        <p className="pb-2">متاسفانه در ثبت اطلاعات شما خطایی رخ داده</p>
        <p>مجددا تلاش کنید.</p>
      </BottomSheet>
    </FormProvider>
  );
}
