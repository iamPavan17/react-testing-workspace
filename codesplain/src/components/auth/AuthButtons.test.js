import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

async function renderComponent() {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );
  await screen.findAllByRole("link"); // to solve act warning
}

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

/* When the user is not signed in */
describe("when user is not signed in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("sign in and sign up are visible", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", {
      name: /sign in/i,
    });
    const signUpButton = screen.getByRole("link", {
      name: /sign up/i,
    });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");

    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole("link", {
      name: /sign out/i,
    });

    // Even this also works, as queryByRole returns null when it doesn't find any element.
    // expect(signOutButton).toBeNull();
    expect(signOutButton).not.toBeInTheDocument();
  });
});

/* When the user is signed in */
// describe("when user is signed in", () => {
//   createServer([
//     {
//       path: "/api/user",
//       res: () => {
//         return { user: { id: 1, email: "rama@mail.co" } };
//       },
//     },
//   ]);
//   test("sign in and sign up are not visible", async () => {
//     renderComponent();
//   });
//   test("sign out is visible", async () => {
//     renderComponent();
//   });
// });
