import { ReactNode } from "react";
import { Toast } from "./types";

type Listener = (toasts: Toast[]) => void;

class ToastStore {
  public toasts: Toast[] = [];
  private listeners: Listener[] = [];

  get currentToasts() {
    return [...this.toasts];
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l([...this.toasts]));
  }

  show(message: ReactNode, opts?: { type?: Toast["type"] }) {
    const id = Math.random().toString(36).slice(2);
    const newToast = { id, message, type: opts?.type ?? "default" };
    this.toasts.push(newToast);
    this.notify();
    return id;
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

export const toastStore = new ToastStore();
