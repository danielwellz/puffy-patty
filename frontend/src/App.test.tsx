import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "./i18n";

test("renders hero tagline and language toggle", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: /Detroit pizzas/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "فا" })).toBeInTheDocument();
});
