"use client";

import { useDialog } from "@/context/dialog-context";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

export function ConfirmDialog() {
  const { dialogState, hideDialog } = useDialog();
  const { isOpen, options } = dialogState;

  if (!options) return null;

  const {
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "warning",
    onConfirm,
    onCancel,
  } = options;

  const handleCancel = () => {
    if (onCancel) onCancel();
    hideDialog();
  };

  const handleConfirm = () => {
    onConfirm();
    hideDialog();
  };

  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" aria-hidden="true" />;
      case "info":
      default:
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />;
    }
  };

  const getConfirmButtonClass = () => {
    switch (variant) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      case "warning":
        return "bg-amber-500 hover:bg-amber-600 focus:ring-amber-400";
      case "info":
      default:
        return "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          static
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={handleCancel}
          className="relative z-[101]"
        >
          <div className="fixed inset-0 bg-zinc-500/75 transition-opacity" />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    onClick={handleCancel}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 sm:mx-0 sm:h-10 sm:w-10">
                    {getIcon()}
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-lg font-medium leading-6 text-zinc-900">
                      {title}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-zinc-500">{message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto ${getConfirmButtonClass()}`}
                    onClick={handleConfirm}
                  >
                    {confirmText}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                    onClick={handleCancel}
                  >
                    {cancelText}
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
