import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

test("it can receive a new user and show it on the list", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("Rama");
  user.click(emailInput);
  user.keyboard("rama@gmail.com");
  user.click(button);

  const name = screen.getByRole("cell", { name: "Rama" });
  const email = screen.getByRole("cell", { name: "rama@gmail.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
