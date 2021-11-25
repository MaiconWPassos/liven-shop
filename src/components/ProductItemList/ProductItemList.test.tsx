import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductItemList from "./index";
import "jest-styled-components";

import { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";

it("should render ProductCard ", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <ProductItemList
        id="1"
        name="Product Test"
        image="https://5d6da1df777f670014036125.mockapi.io/api/v1/product/1"
        price="1.00"
        quantity={50}
      />
    </ThemeProvider>
  );
  expect(getByText("R$ 50,00")).toBeInTheDocument();
});
