import Image from "next/image";

interface Props {
  title: string;
}
export function Header({ title }: Props) {
  return (
    <div className="flex items-center shadow-md h-[56px] px-2">
      <div className="bg-amber-400 w-8 h-8 rounded-md flex items-center justify-center ml-2">
        <Image src="car.svg" width={21} height={21} alt="car" />
      </div>
      <p className="text-xl">{title}</p>
    </div>
  );
}
