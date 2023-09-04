import React from "react";
import renderer from "react-test-renderer";
import LocationPage from "./LocationPage";

describe("test LocationPage", () => {
  it("renders LocationPage", () => {
    const wrapper = renderer.create(<LocationPage />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
