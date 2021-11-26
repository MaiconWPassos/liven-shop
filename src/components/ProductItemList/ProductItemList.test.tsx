import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductItemList from "./index";
import "jest-styled-components";

import { ThemeProvider } from "styled-components";

import IntlProvider from "../../contexts/IntlContext";

import theme from "../../styles/theme";

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

it("should render ProductItemList ", () => {
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
        <ProductItemList
          id="1"
          name="Product Test"
          image="https://5d6da1df777f670014036125.mockapi.io/api/v1/product/1"
          price="1.00"
          quantity={50}
        />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(getByText("R$ 50,00")).toBeInTheDocument();
});
