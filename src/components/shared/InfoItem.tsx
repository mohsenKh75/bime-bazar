import React from "react";

interface Props {
  label: string;
  value: string;
}

export function InfoItem({ label, value }: Props) {
  return (
    <div className="space-y-2 text-right">
      <div className="flex items-center">
        <span className="text-gray-500 whitespace-nowrap">{label}</span>
        <div className="flex-grow border border-dashed border-t border-gray-300 mx-2"></div>
        <span className="text-black">{value}</span>
      </div>
    </div>
  );
}
