import { classnames } from "@/utils/classNames";
import Image from "next/image";

interface Props {
  title: string;
  className?: string;
}
export function SectionHeader({ title, className }: Props) {
  return (
    <div
      className={classnames(
        "flex items-center shadow-md h-[56px] px-2",
        className
      )}
    >
      <div className="bg-amber-400 w-8 h-8 rounded-md flex items-center justify-center ml-2">
        <Image src="car.svg" width={21} height={21} alt="car" />
      </div>
      <p className="text-xl">{title}</p>
    </div>
  );
}
