import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductCard from "./index";
import "jest-styled-components";

import { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";
import IntlProvider from "../../contexts/IntlContext";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
      locale: "pt",
    };
  },
}));

it("should render ProductCard", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  useRouter.mockImplementation(() => ({
    route: "/",
    pathname: "/cart",
    query: "",
    asPath: "",
    locale: "pt",
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));

  const { getByText } = render(
    <IntlProvider>
      <ThemeProvider theme={theme}>
        <ProductCard
          id="1"
          name="Product Test"
          image="https://5d6da1df777f670014036125.mockapi.io/api/v1/product/1"
          price="12.00"
        />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(getByText("Product Test")).toBeInTheDocument();
});
