"use client";

import { DialogOptions } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface DialogContextType {
  showDialog: (options: DialogOptions) => void;
  hideDialog: () => void;
  dialogState: {
    isOpen: boolean;
    options: DialogOptions | null;
  };
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    options: DialogOptions | null;
  }>({
    isOpen: false,
    options: null,
  });

  const showDialog = (options: DialogOptions) => {
    setDialogState({
      isOpen: true,
      options,
    });
  };

  const hideDialog = () => {
    setDialogState({
      isOpen: false,
      options: null,
    });
  };

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        hideDialog,
        dialogState,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
