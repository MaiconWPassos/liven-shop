import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductCard from "./index";
import "jest-styled-components";

import { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";

it("should render ProductCard", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <ProductCard
        id="1"
        name="Product Test"
        image="https://5d6da1df777f670014036125.mockapi.io/api/v1/product/1"
        price="12.00"
      />
    </ThemeProvider>
  );
  expect(getByText("Product Test")).toBeInTheDocument();
});
