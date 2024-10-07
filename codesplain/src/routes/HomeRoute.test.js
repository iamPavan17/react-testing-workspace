import { screen, render } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const handlers = [
  // So this function, is going to watch for any request
  // that is being made by our components.
  rest.get("/api/repositories", (req, res, ctx) => {
    // Our all requests have query string with a letter q in it.
    // And it has some filter criteria.
    const query = req.url.searchParams.get("q");
    console.log(query);

    return res(
      ctx.json({
        items: [
          { id: 1, full_name: "test1" },
          { id: 2, full_name: "test2" },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

// Will execute one time before all the tests inside of this file.
beforeAll(() => {
  server.listen(); // start the server and listen
});

// Will execute one time after each individual tests is executed inside of this file.
afterEach(() => {
  server.resetHandlers(); // reset the handlers to their initial state.
});

// Will execute one time after all tests have executed inside of this file.
afterAll(() => {
  server.close(); // close the server
});
