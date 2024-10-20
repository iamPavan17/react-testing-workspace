import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

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
  test("when user is not signed in, sign in and sign up are visible", async () => {
    console.log("Test 1");
  });
  test("when user is not signed in, sign out is not visible", async () => {
    console.log("Test 2");
  });
});

/* When the user is signed in */
describe("when user is signed in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 1, email: "pavan@bambu.co" } };
      },
    },
  ]);
  test("when user is signed in, sign in and sign up are not visible", async () => {
    console.log("Test 3");
  });
  test("when user is signed in, sign out is visible", async () => {
    console.log("Test 4");
  });
});
