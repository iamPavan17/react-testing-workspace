import { screen, render } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

jest.mock("../tree/FileIcon", () => {
  return () => {
    return "File Icon Component";
  };
});

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
}

test("shows a link to the github homepage for this repository", async function () {
  renderComponent();

  //   await screen.findByRole("img", {
  //     name: /javascript/i,
  //   });
});

// function pause() {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 1000);
//   });
// }
