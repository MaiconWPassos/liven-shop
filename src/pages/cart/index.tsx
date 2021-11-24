import React from "react";
import ProductItemList from "../../components/ProductItemList";
import useCart from "../../hooks/useCart";

import { Container, SectionProducts } from "./styles";

const Cart: React.FC = () => {
  const { products } = useCart();
  return (
    <Container>
      <h1>Seu carrinho de compras</h1>

      <SectionProducts>
        {products.map((product) => (
          <ProductItemList {...product} />
        ))}

        {products.length === 0 && <p> Nenhum produto no carrinho.</p>}
      </SectionProducts>
    </Container>
  );
};

export default Cart;
