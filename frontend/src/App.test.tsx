import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "./i18n";

test("renders login screen with language toggle", () => {
  render(<App />);
  expect(screen.getByText(/ورود/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "فا" })).toBeInTheDocument();
});
