import React, { useEffect, useState } from "react";
import ProductItemList from "../../components/ProductItemList";
import useCart from "../../hooks/useCart";
import styled from "styled-components";
import { useIntl } from "react-intl";
import Link from "next/link";

const Cart: React.FC = () => {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { products } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const mapValues = products.map(
        (prod) => parseFloat(prod.price) * prod.quantity
      );
      const sum = mapValues.reduce(function (value, i) {
        return value + i;
      });
      setTotal(sum);
    }
  }, [products]);
  return (
    <Container>
      <h1>{f("hello")}</h1>

      <SectionProducts>
        {products.map((product) => (
          <ProductItemList {...product} key={product.id} />
        ))}

        {products.length === 0 && <p> {f("labelEmpty")}</p>}
      </SectionProducts>

      {products.length > 0 && (
        <h1 className="total">
          Total:{" "}
          {total.toLocaleString("pt-BR", {
            currency: "BRL",
            minimumFractionDigits: 2,
            style: "currency",
          })}
        </h1>
      )}

      <Link href="/checkout">
        <a className="btn-finish">{f("labelButtonCheckout")}</a>
      </Link>
    </Container>
  );
};

export default Cart;

export const Container = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: column;
  min-height: calc(100vh - 60px);

  h1 {
    font-size: 24px;
  }

  @media (min-width: 968px) {
    padding: 8px 150px;
    padding-top: 48px;
  }

  .total {
    width: 100%;
    text-align: right;
    font-weight: bold;
    font-size: 36px;
  }

  .btn-finish {
    border: 1px solid;
    border-radius: 20px;
    border-color: ${({ theme }) => theme.colors.color};
    color: ${({ theme }) => theme.colors.color};

    width: 200px;
    text-align: center;
    padding: 8px 10px;
    animation: all 0.25s linear;
    &:hover {
      opacity: 0.9;
    }
  }
`;

export const SectionProducts = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: column;

  @media (min-width: 968px) {
    margin-top: 48px;
  }

  > div:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
