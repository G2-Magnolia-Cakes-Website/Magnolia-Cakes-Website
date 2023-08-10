import React from "react";
import renderer from "react-test-renderer";
import PageLayout from "./PageLayout";
import { BrowserRouter } from "react-router-dom";

describe("test PageLayout", () => {
  it("render PageLayout", () => {
    const wrapper = renderer
      .create(
        <BrowserRouter>
          <PageLayout />
        </BrowserRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
