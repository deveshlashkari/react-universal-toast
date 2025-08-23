import { ReactNode } from "react";

export type ToastType = "success" | "error" | "info" | "default";

export type Placement =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface Toast {
  id: string;
  message: ReactNode;
  type?: ToastType;
}
