[{"content":"import { render, screen } from '@testing-library/react';\n\nfunction RoleExample() {\n  return (\n    <div>\n      <a href=\"/\">Link</a>\n      <button>Button</button>\n      <footer>Contentinfo</footer>\n      <h1>Heading</h1>\n      <header>Banner</header>\n      <img alt=\"description\" /> Img\n      <input type=\"checkbox\" /> Checkbox\n      <input type=\"number\" /> Spinbutton\n      <input type=\"radio\" /> Radio\n      <input type=\"text\" /> Textbox\n      <li>Listitem</li>\n      <ul>Listgroup</ul>\n    </div>\n  );\n}\n\nrender(<RoleExample />);","type":"code","id":"r0dbz"},{"content":"test('can find elements by role', function () {\n  render(<RoleExample />);\n\n  const roles = [\n    'link', // <a />\n    'button', // <button />\n    'contentinfo', // <footer />\n    'heading', // <h1... />\n    'banner', // <header />\n    'img', // <img />\n    'checkbox', // <input type=\"checkbox\" />\n    'spinbutton', // <input type=\"number\" />\n    'radio', // <input type=\"radio\" />\n    'textbox', // <input type=\"text\" />\n    'listitem', // <li />\n    'list', // <ul />\n  ];\n\n  for(let role of roles) {\n    const el = screen.getByRole(role);\n\n    expect(el).toBeInTheDocument();\n  }\n\n});","type":"code","id":"6wlko"}]