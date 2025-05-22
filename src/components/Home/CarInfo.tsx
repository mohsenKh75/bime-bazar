import Image from "next/image";
import { InfoItem } from "../shared/InfoItem";

const CAR_INSURANCE_INFO = [
  { label: "شرکت بیمه‌گر", value: "پارسیان" },
  { label: "برند خودرو", value: "پژو" },
  { label: "مدل خودرو", value: "206 تیپ 6" },
];
export default function CarInfo() {
  return (
    <div className="pt-5 px-4 flex flex-col items-center">
      <Image src="car_plate.svg" alt="plate" width={280} height={50} />
      <div className="w-full">
        {CAR_INSURANCE_INFO.map((item) => (
          <InfoItem key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </div>
  );
}
