import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("it displays information about the repositories", function () {
  const repository = {
    stargazers_count: 5,
    open_issues: 1,
    forks: 30,
    language: "JavaScript",
  };
  // Render the component
  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument(); // Check if the element is in the DOM
  }
});
