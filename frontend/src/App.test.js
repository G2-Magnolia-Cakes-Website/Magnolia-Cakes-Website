// import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";

test("renders learn react link", () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  const wrapper = renderer.create(<App />).toJSON();
  expect(wrapper).toMatchSnapshot();
});
