[{"content":"# Querying for Elements With Different Criteria\n\nReact Testing Library provides many different query functions.  Each begins with a name like `getBy`, `findBy`, etc.  The names also have common endings.  The different name endings indicate how the query for an element will be performed.\n\n| End of Function Name | Search Criteria                                                    |\n|----------------------|--------------------------------------------------------------------|\n| ByRole               | Finds elements based on their implicit or explicit ARIA role       |\n| ByLabelText          | Find form elements based upon the text their paired labels contain |\n| ByPlaceholderText    | Find form elements based upon their placeholder text               |\n| ByText               | Find elements based upon the text they contain                     |\n| ByDisplayValue       | Find elements based upon their current value                       |\n| ByAltText            | Find elements based upon their `alt` attribute                     |\n| ByTitle              | Find elements based upon their `title` attribute                   |\n| ByTestId             | Find elements based upon their `data-testid` attribute             |\n\n## When to Use Each\n\nAlways prefer using query functions ending with `ByRole`.  Only use others if `ByRole` is not an option.","type":"text","id":"erck3"},{"content":"import { screen, render } from '@testing-library/react';\nimport { useState } from 'react';\n\nfunction DataForm() {\n  const [email, setEmail] = useState('asdf@asdf.com');\n\n  return (\n    <form>\n      <h3>Enter Data</h3>\n\n      <div data-testid=\"image wrapper\">\n        <img alt=\"data\" src=\"data.jpg\" />\n      </div>\n\n      <label htmlFor=\"email\">Email</label>\n      <input \n        id=\"email\"\n        value={email}\n        onChange={e => setEmail(e.target.value)}\n      />\n\n      <label htmlFor=\"color\">Color</label>\n      <input id=\"color\" placeholder=\"Red\" />\n\n      <button title=\"Click when ready to submit\">\n        Submit\n      </button>\n    </form>\n  );\n}\n\nrender(<DataForm />);","type":"code","id":"drua1"},{"content":"test('selecting different elements', () => {\n  render(<DataForm />);\n\n  const elements = [\n    // 1st priority\n    screen.getByRole('button'),\n    screen.getByText(/enter data/i), // or -> (\"Enter\") regex recommended\n\n    // 2nd priority\n    screen.getByLabelText(/email/i), // or -> (\"Email\")\n    screen.getByPlaceholderText('Red'),\n    screen.getByDisplayValue('asdf@asdf.com'),\n    screen.getByAltText('data'),\n    screen.getByTitle(/ready to submit/i),\n\n    // 3rd priority\n    screen.getByTestId('image wrapper'),\n  ];\n\n  for (let element of elements) {\n    expect(element).toBeInTheDocument();\n  }\n});\n","type":"code","id":"cpl5j"}]