import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { RenderResult } from "vitest-browser-react";
import { render } from "vitest-browser-react";

import MobileNavigation from "../src/index.tsx";

describe("MobileNavigation", () => {
  it("should have MobileNavigation in document", () => {
    const screen: RenderResult = render(<MobileNavigation contents={[]} />);

    const mobileNavigation = screen.getByTestId("mobile-navigation");

    expect(mobileNavigation).toBeInTheDocument();
  });

  it("should have NavigationBar in document", () => {
    const screen: RenderResult = render(<MobileNavigation contents={[]} />);

    const navigationBar = screen.getByTestId("navigation-bar");

    expect(navigationBar).toBeInTheDocument();
  });

  it("should have ContentContainer in document", () => {
    const screen: RenderResult = render(<MobileNavigation contents={[]} />);

    const contentContainer = screen.getByTestId("content-container");

    expect(contentContainer).toBeInTheDocument();
  });
});
