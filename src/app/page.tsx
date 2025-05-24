"use client";
import CarInfo from "@/components/Home/CarInfo";
import { FormSection } from "@/components/Home/FormSection";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function Home() {
  return (
    <div>
      <SectionHeader title="مشخصات بیمه نامه" />
      <CarInfo />
      <SectionHeader title="مشخصات مالک خودرو" className="my-5" />
      <div className="px-5">
        <p className="text-md pb-5">
          لطفا اطلاعات مالک شخصی خودرو را وارد کنید
        </p>
        <FormSection />
      </div>
    </div>
  );
}
