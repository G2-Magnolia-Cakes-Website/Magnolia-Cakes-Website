// import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  const wrapper = renderer
    .create(
      // <BrowserRouter>
      <App />
      // </BrowserRouter>
    )
    .toJSON();
  expect(wrapper).toMatchSnapshot();
});
