import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

// We can define a test by calling the built in test function.
// This is built into global env, so we don't need to import the
// test function into this file.
/*
    Two parameters,
    1. String - A short description of the test.
    2. Function - The code to be tested.
*/
test("it shows two inputs and a button", function () {
  // 1. render the component
  render(<UserForm />);

  // 2. Manipulate or find the element in it
  // Example: Simulate typing inside of some text input
  // or simulate clicking on a button or something
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // 3. Assertion - meaning that we're going to make sure that our component
  // is doing what we expected it to do.
  // Example: Might be it successfully calls a callback function,
  // Maybe it shows some element on the screen.
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});
