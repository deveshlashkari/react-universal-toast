import { ReactNode } from "react";
import { toastStore } from "./toastStore";

export const toast = {
  show: (msg: ReactNode, opts?: { type?: "success" | "error" | "info" }) =>
    toastStore.show(msg, opts),
  success: (msg: ReactNode) => toastStore.show(msg, { type: "success" }),
  error: (msg: ReactNode) => toastStore.show(msg, { type: "error" }),
  info: (msg: ReactNode) => toastStore.show(msg, { type: "info" }),
  remove: (id: string) => toastStore.remove(id),
  clear: () => toastStore.clear(),
};
