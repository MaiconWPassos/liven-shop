import React from "react";
import {
  renderHook,
  act,
  WrapperComponent,
} from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import useCart from "./useCart";
import "jest-styled-components";

import { CartProvider } from "../contexts/CartContext";

it("must render add 2 products to the cart and at the end validate the total value of the items", () => {
  const wrapper: React.FC<WrapperComponent<any>> = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result, rerender } = renderHook(() => useCart(), {
    wrapper,
  });

  act(() => {
    result.current.addProduct({
      id: "1",
      name: "Product Test",
      image: "",
      price: "200.00",
      quantity: 1,
      stock: 100,
    });
  });

  expect(result.current.products.length).toBe(1);

  act(() => {
    result.current.addProduct({
      id: "2",
      name: "Product Test 2",
      image: "",
      price: "100.00",
      quantity: 2,
      stock: 100,
    });
  });

  expect(result.current.products.length).toBe(2);

  const mapValues = result.current.products.map(
    (prod) => parseFloat(prod.price) * prod.quantity
  );
  const sum = mapValues.reduce(function (value, i) {
    return value + i;
  });

  expect(sum).toBe(400);
});
