import CarInfo from "@/components/Home/CarInfo";
import { Header } from "@/components/shared/Header";

export default function Home() {
  return (
    <div>
      <Header title="مشخصات بیمه نامه" />
      <CarInfo />
    </div>
  );
}
