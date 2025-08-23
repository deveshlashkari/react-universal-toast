import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toastStore } from "./toastStore";
import { Toast, Placement } from "./types";

interface ToastContextType {
  show: (msg: ReactNode, opts?: { type?: Toast["type"] }) => string;
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({
  children,
  placement = "top-right"
}: { children: ReactNode; placement?: Placement }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsub = toastStore.subscribe(setToasts);
    return unsub;
  }, []);

  return (
    <ToastContext.Provider value={{
      show: toastStore.show.bind(toastStore),
      remove: toastStore.remove.bind(toastStore)
    }}>
      {children}
      <div className={`toast-container toast-${placement}`}>
        {toasts.map((t: Toast) => (
          <div
            key={t.id}
            className={`toast toast-${t.type}`}
            onClick={() => toastStore.remove(t.id)}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
