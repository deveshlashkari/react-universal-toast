import { toastStore } from "../src/toastStore";

describe("ToastStore", () => {
  beforeEach(() => {
    toastStore.clear();
  });

  test("starts with empty toast list", () => {
    let currentToasts: any[] = [];
    const unsub = toastStore.subscribe((toasts) => {
      currentToasts = toasts;
    });
    
    expect(currentToasts).toEqual([]);
    unsub();
  });

  test("adds toast and notifies subscribers", () => {
    let currentToasts: any[] = [];
    const unsub = toastStore.subscribe((toasts) => {
      currentToasts = toasts;
    });

    const id = toastStore.show("Test Toast", { type: "success" });
    
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(currentToasts).toHaveLength(1);
    expect(currentToasts[0]).toEqual({
      id,
      message: "Test Toast",
      type: "success"
    });

    unsub();
  });

  test("removes specific toast by id", () => {
    let currentToasts: any[] = [];
    const unsub = toastStore.subscribe((toasts) => {
      currentToasts = toasts;
    });

    const id1 = toastStore.show("Toast 1");
    const id2 = toastStore.show("Toast 2");
    
    expect(currentToasts).toHaveLength(2);

    toastStore.remove(id1);
    
    expect(currentToasts).toHaveLength(1);
    expect(currentToasts[0].id).toBe(id2);

    unsub();
  });

  test("clear removes all toasts", () => {
    let currentToasts: any[] = [];
    const unsub = toastStore.subscribe((toasts) => {
      currentToasts = toasts;
    });

    toastStore.show("Toast 1");
    toastStore.show("Toast 2");
    
    expect(currentToasts).toHaveLength(2);

    toastStore.clear();
    
    expect(currentToasts).toHaveLength(0);

    unsub();
  });
});