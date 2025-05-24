"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useBottomSheet } from "@/Providers/BottomSheetProvider";
import { classnames } from "@/utils/classNames";
import { isServerSide } from "@/utils/helpers";
import Image from "next/image";
import { Button } from "../core/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headerTitle?: string;
  hasFooter?: boolean;
  hasTwoOptionsFooter?: boolean;
  footerCloseCallback?: (param?: any) => void;
  isFooterButtonDisabled?: boolean;
  isClosePrevented?: boolean;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  headerTitle,
  hasFooter,
  hasTwoOptionsFooter,
  footerCloseCallback,
  isFooterButtonDisabled,
  isClosePrevented,
}: Props) {
  const { pushToSheetStack, removeFromSheetStack, sheetStack } =
    useBottomSheet();
  const [sheetId, setSheetId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const isDisplayedOnTop = sheetStack[sheetStack.length - 1] === sheetId;
  const isHiddenBehind = sheetStack[sheetStack.length - 2] === sheetId;

  useEffect(() => {
    if (isOpen) {
      const id = pushToSheetStack();
      setSheetId(id);
      setVisible(true);
      const timeout = setTimeout(() => setAnimateIn(true), 10);
      return () => {
        clearTimeout(timeout);
        removeFromSheetStack();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isHiddenBehind) {
      timeout = setTimeout(() => setAnimateIn(true), 200);
    }
    return () => clearTimeout(timeout);
  }, [isDisplayedOnTop, isHiddenBehind]);

  function handleClose() {
    setAnimateIn(false);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 200);
  }

  if (isServerSide) return null;
  const root = document.getElementById("bottom-sheet-root");
  if (!visible || !root) return null;

  function closeFromFooter() {
    setAnimateIn(false);
    setTimeout(() => {
      setVisible(false);
      footerCloseCallback?.();
    }, 200);
  }
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-end bg-black/40 backdrop-md"
      onClick={handleClose}
    >
      <div
        className={classnames(
          "w-full max-w-md bg-white rounded-t-xl p-4 transition-transform duration-200 ease-in-out",
          animateIn
            ? isDisplayedOnTop
              ? "translate-y-0"
              : "translate-y-full"
            : "translate-y-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={classnames(
            "flex items-center border-b border-gray-300 h-10 pb-3 mb-4",
            { "justify-between": headerTitle, "justify-end": !headerTitle }
          )}
        >
          {headerTitle && <p>{headerTitle}</p>}
          <Image
            className="self-end"
            onClick={handleClose}
            src="close.svg"
            alt="close"
            width={24}
            height={24}
          />
        </div>
        {children}
        {hasFooter && (
          <Button
            color="black"
            className="w-full pt-4"
            disabled={isFooterButtonDisabled}
            onClick={isClosePrevented ? footerCloseCallback : closeFromFooter}
          >
            انتخاب
          </Button>
        )}
        {hasTwoOptionsFooter && (
          <div className="flex gap-2 pt-4 w-full">
            <Button
              color="black"
              className="w-full"
              onClick={isClosePrevented ? footerCloseCallback : closeFromFooter}
            >
              تایید
            </Button>
            <Button
              color="black"
              variant="outlined"
              className="w-full"
              onClick={handleClose}
            >
              بازگشت
            </Button>
          </div>
        )}
      </div>
    </div>,
    root
  );
}
