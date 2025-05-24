import { GET_ADDRESS_LIST } from "@/apis/home/endpoints";
import { Address } from "@/apis/home/types";
import { Button } from "@/components/core/Button";
import { BottomSheet } from "@/components/shared/BottomSheet";
import { useApi } from "@/hooks/useApi";
import { isUndefined } from "@/utils/helpers";
import { useState } from "react";
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { AddressItem } from "./AddressItem";
import { classnames } from "@/utils/classNames";

interface Props {
  methods: UseFormReturn<FieldValues, any, FieldValues>;
}
export function AddressField({ methods }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [addressList, setAddressList] = useState<Array<Address> | undefined>();
  const { request, pending } = useApi<Array<Address>>({
    ep: GET_ADDRESS_LIST,
  });
  console.log(errors);

  function getAddressListData() {
    request().then((res) => {
      if (res) setAddressList(res);
      setIsOpen(true);
    });
  }
  const addressId = methods.watch("addressOptions");
  const isAddressSelected = !isUndefined(addressId);

  function getSelectedAddress() {
    return addressList?.find((address) => address.id === addressId);
  }

  function onModalClose() {
    methods.setValue("addressOptions", undefined);
    setIsOpen(false);
  }

  function removeAddress(addressId: string) {
    setAddressList(addressList?.filter((address) => address.id !== addressId));
    methods.setValue("addressOptions", undefined);
  }
  return (
    <>
      <div className="self-start pt-5">
        <p className="text-md pb-2">آدرس جهت درج روی بیمه‌نامه</p>
        <p
          className={classnames("text-sm", {
            "text-red-500": errors?.addressOptions?.message,
          })}
        >
          لطفا آدرسی که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید
        </p>
      </div>
      <div className="w-full">
        <Button
          pending={pending}
          onClick={getAddressListData}
          className="py-2 rounded w-full"
        >
          انتخاب از آدرس‌های من
        </Button>
        {getSelectedAddress() && (
          <>
            <p className="text-md pt-2">آدرس انتخابی شما</p>
            <p className="text-sm text-gray-500">
              {getSelectedAddress()?.details}
            </p>
          </>
        )}
      </div>
      <BottomSheet
        headerTitle="انتخاب آدرس"
        isOpen={isOpen}
        onClose={onModalClose}
        isFooterButtonDisabled={!isAddressSelected}
        hasFooter
        footerCloseCallback={() => setIsOpen(false)}
      >
        <input
          type="hidden"
          {...register("addressOptions", {
            required:
              "لطفا آدرسی که می‌خواهید روی بیمه‌نامه درج شود را انتخاب کنید.",
          })}
        />
        <div>
          {addressList &&
            addressList?.map((address) => (
              <AddressItem
                required
                className="pb-3"
                name="addressOptions"
                value={address.id}
                label={address.name}
                description={address.details}
                key={address.id}
                onRemoveClick={removeAddress}
              />
            ))}
        </div>
      </BottomSheet>
    </>
  );
}
