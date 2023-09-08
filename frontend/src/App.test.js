// import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";

jest.mock("axios");

jest.mock("swiper/react", () => ({
  Swiper: ({ children }) => children,
  SwiperSlide: ({ children }) => children,
}));

jest.mock("swiper/modules", () => ({
  Autoplay: (props) => null,
  EffectFade: (props) => null,
  Navigation: (props) => null,
  Pagination: (props) => null,
  Keyboard: (props) => null,
}));

jest.mock("swiper/css", () => jest.fn());

window.scrollTo = jest.fn();

describe("test App", () => {
  test("renders App", () => {
    const wrapper = renderer.create(<App />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
