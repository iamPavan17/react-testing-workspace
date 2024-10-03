import { screen, render, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

// Option 2
// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "rama/react-app",
    language: "JavaScript",
    description: "A minimalistic React app",
    owner: { login: "rama" },
    name: "react-app",
    html_url: "https://github.com/rama/react-app",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github homepage for this repository", async function () {
  const { repository } = renderComponent();

  // Option 3 -> For solving act warning
  //   await act(async () => {
  //     await pause();
  //   });

  // Option 1 (Best) -> For solving act warning
  await screen.findByRole("img", {
    name: /javascript/i,
  });

  const linkElement = screen.getByRole("link", {
    name: /github repository/i,
  });
  expect(linkElement).toHaveAttribute("href", repository.html_url);
});

// function pause() {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 1000);
//   });
// }
