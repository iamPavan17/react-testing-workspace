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
  const inputs = screen.getAllByRole("textbox"); // gets all the input elements
  const button = screen.getByRole("button"); // gets the button element

  // 3. Assertion - meaning that we're going to make sure that our component
  // is doing what we expected it to do.
  // Example: Might be it successfully calls a callback function,
  // Maybe it shows some element on the screen.
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("It calls onUserAdd when the form is submitted", async function () {
  const mock = jest.fn();

  // render the component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  const nameInput = screen.getByRole("textbox", {
    // <label htmlFor="name">Name</label>
    name: /name/i, // i meaning not to worry about lowercase or uppercase.
  });
  const emailInput = screen.getByRole("textbox", {
    // <label htmlFor="email">Enter Email</label>
    // Regular expression can just be "email" because it'll
    // match against just the email part. No need to have "enter email".
    name: /email/i,
  });

  // Simulate typing in a name
  user.click(nameInput);
  user.keyboard("Rama");

  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard("rama@mail.com");

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking on a button
  user.click(button);

  // Assertion to make sure "onUserAdd" gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "Rama", email: "rama@mail.com" });
});
