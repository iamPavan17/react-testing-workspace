import { screen, render } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

createServer([
  {
    path: "/api/repositories",
    res: (req) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      return {
        items: [
          { id: 1, full_name: `${language}_one` }, // Example -> javascript_one
          { id: 2, full_name: `${language}_two` }, // Example -> javascript_two
        ],
      };
    },
  },
]);

// const handlers = [
//   // So this function, is going to watch for any request
//   // that is being made by our components.
//   rest.get("/api/repositories", (req, res, ctx) => {
//     // Our all requests have query string with a letter q in it.
//     // And it has some filter criteria.
//     const language = req.url.searchParams.get("q").split("language:")[1];

//     return res(
//       ctx.json({
//         items: [
//           { id: 1, full_name: `${language}_one` }, // Example -> javascript_one
//           { id: 2, full_name: `${language}_two` }, // Example -> javascript_two
//         ],
//       })
//     );
//   }),
// ];

// const server = setupServer(...handlers);

// // Will execute one time before all the tests inside of this file.
// beforeAll(() => {
//   server.listen(); // start the server and listen
// });

// // Will execute one time after each individual tests is executed inside of this file.
// afterEach(() => {
//   server.resetHandlers(); // reset the handlers to their initial state.
// });

// // Will execute one time after all tests have executed inside of this file.
// afterAll(() => {
//   server.close(); // close the server
// });

test("render two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Loop over each language, because for each language we're calling seperate APIs.
  // Overall, 6 APIs are executed
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];
  for (let language of languages) {
    // For each language, make sure we see two links
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    // Assert that links have the appropriate full_name
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);

    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});
