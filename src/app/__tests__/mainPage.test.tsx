import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";
test("renders the correct content", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Welcome to the Star Wars Characters Database",
    })
  ).toBeDefined();
  expect(
    screen.getByText(
      "Here you can explore the vast universe of Star Wars characters, discover detailed info of each character, and see flows of each character, containing info about all the films and starships retated to him"
    )
  ).toBeDefined();
  expect(screen.getByText("View Characters")).toBeDefined();
});
