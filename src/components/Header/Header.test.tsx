import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import "jest-styled-components";
import { CartProvider } from "../../contexts/CartContext";
import { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";

it("should render Header", () => {
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Header />
      </CartProvider>
    </ThemeProvider>
  );
  expect(getByTestId("button-cart").closest("button")).toBeInTheDocument();
});
