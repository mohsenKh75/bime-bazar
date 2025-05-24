"use client";

import { createContext, useContext, useState } from "react";

type BottomSheetContextType = {
  sheetStack: number[];
  pushToSheetStack: () => number;
  removeFromSheetStack: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export function BottomSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheetStack, setSheetStack] = useState<number[]>([]);

  function pushToSheetStack() {
    const id = Date.now();
    setSheetStack((prev) => [...prev, id]);
    return id;
  }

  function removeFromSheetStack() {
    setSheetStack((prev) => prev.slice(0, -1));
  }

  return (
    <BottomSheetContext.Provider
      value={{ sheetStack, pushToSheetStack, removeFromSheetStack }}
    >
      {children}
      <div id="bottom-sheet-root" />
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  const context = useContext(BottomSheetContext);
  if (!context) throw new Error("make sure that context is accessible");
  return context;
}
