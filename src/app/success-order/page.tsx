import CarInfo from "@/components/Home/CarInfo";
import { SectionHeader } from "@/components/shared/SectionHeader";
import Image from "next/image";

export default function SuccessOrder() {
  return (
    <div>
      <SectionHeader title="مشخصات بیمه نامه" />
      <div className="flex flex-col items-center pt-10">
        <Image src="/success.png" width={60} height={66} alt="success" />
        <p className="pt-4">
          اطلاعات شما با <span className="text-green-600">موفقیت</span> ثبت شد.
        </p>
        <CarInfo />
      </div>
    </div>
  );
}
