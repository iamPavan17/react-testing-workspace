import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

function renderComponent() {
  return render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );
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
    renderComponent();
    await screen.findAllByRole("link");
  });
  test("sign out is not visible", async () => {
    renderComponent();
    await screen.findAllByRole("link");
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
