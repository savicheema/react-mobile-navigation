import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { RenderResult } from "vitest-browser-react";
import { render } from "vitest-browser-react";

import MyComponent from "../src/index.tsx";

describe("My Component", () => {
  it("should have MyComponent text", () => {
    const screen: RenderResult = render(<MyComponent />);

    const myComponent = screen.getByTestId("my-component");

    expect(myComponent).toHaveTextContent("MyComponent");
  });
});
