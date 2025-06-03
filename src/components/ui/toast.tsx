"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    
    // Auto remove after duration
    setTimeout(() => {
      get().removeToast(id);
    }, toast.duration || 5000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

export const useToast = () => {
  const { addToast } = useToastStore();
  
  return {
    toast: {
      success: (message: string, duration?: number) => addToast({ type: "success", message, duration }),
      error: (message: string, duration?: number) => addToast({ type: "error", message, duration }),
      info: (message: string, duration?: number) => addToast({ type: "info", message, duration }),
    },
  };
};

const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case "error":
      return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
    case "info":
      return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
  }
};

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-50 border-green-200"
              : toast.type === "error"
              ? "bg-red-50 border-red-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <ToastIcon type={toast.type} />
          <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
