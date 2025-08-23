import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToastProvider, useToast } from "../src";

function TestComponent() {
  const { show } = useToast();
  return (
    <button onClick={() => show("Hello World", { type: "success" })}>
      Show Toast
    </button>
  );
}

test("ToastProvider renders without error", () => {
  render(
    <ToastProvider>
      <div>Test content</div>
    </ToastProvider>
  );
  
  expect(screen.getByText("Test content")).toBeInTheDocument();
  expect(document.querySelector('.toast-container')).toBeInTheDocument();
});

test("useToast hook works within provider", () => {
  render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );
  
  expect(screen.getByText("Show Toast")).toBeInTheDocument();
  
  // Click the button - this should not throw an error
  fireEvent.click(screen.getByText("Show Toast"));
  
  // Verify the toast container exists
  expect(document.querySelector('.toast-container')).toBeInTheDocument();
});

test("useToast throws error when used outside provider", () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  function ComponentOutsideProvider() {
    const { show } = useToast();
    return <div>Should throw</div>;
  }

  expect(() => {
    render(<ComponentOutsideProvider />);
  }).toThrow("useToast must be used within ToastProvider");

  consoleError.mockRestore();
});
