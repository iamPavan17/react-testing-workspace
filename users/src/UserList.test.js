import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

test("render one row per user", function () {
  const users = [
    { name: "Rama", email: "rama@gmail.com" },
    { name: "John", email: "john@gmail.com" },
  ];
  // Render the component
  render(<UserList users={users} />);

  // Find all the rows in the table
  // const rows = screen.getAllByRole("row");
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  // eslint-disable-next-line
  // const rows = container.querySelectorAll("tbody tr");

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the name and email of each user", function () {
  const users = [
    { name: "Rama", email: "rama@gmail.com" },
    { name: "John", email: "john@gmail.com" },
  ];
  render(<UserList users={users} />);

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
