import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

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

describe("test HomePage", () => {
  it("renders HomePage", () => {
    const wrapper = renderer
      .create(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
