import React from "react";
import toast from "react-hot-toast";
import { TiWarningOutline } from "react-icons/ti";

export const SuccessNotification = (message: string) => toast.success(message);
export const ErrorNotification = (message: string) => toast.error(message);

export interface IConfirmationModal {
  title: string;
  body: string;
  ButtonText: string;
  onConfirm?: () => void;
}

export const comfirmationToast = (modal: IConfirmationModal) =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 p-4 bg-red-300 rounded-full">
            <TiWarningOutline className="text-2xl text-white" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-slate-900">
              {modal.title}
            </p>
            <p className="mt-1 text-sm text-slate-500">{modal.body}</p>
          </div>
        </div>
        <div className="flex justify-end gap-1">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-100 text-slate-800 rounded-lg px-4 py-2 font-semibold text-sm hover:bg-slate-200 focus:outline-none"
          >
            Cancel
          </button>
          {modal.onConfirm !== undefined && (
            <button
              onClick={() => {
                toast.dismiss(t.id);
                if (modal.onConfirm !== undefined) modal.onConfirm();
              }}
              className="bg-red-100 text-red-500 rounded-lg px-4 py-2 font-semibold text-sm hover:bg-red-200 focus:outline-none"
            >
              {modal.ButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  ));
