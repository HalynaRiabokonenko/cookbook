import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it.skip("", () => {
    const { baseElement, debug } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
