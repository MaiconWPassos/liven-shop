import React, { useEffect, useState } from "react";
import { set, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import styled, { useTheme } from "styled-components";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";

import useCart from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

const MySwal = withReactContent(Swal);

const Cart: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { products, clearProducts } = useCart();
  const { user, signInWithGoogle } = useAuth();

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

  async function storeOrder() {
    await set(ref(database, "orders/" + uuidv4()), {
      username: user.name,
      userId: user.id,
      products: products,
    });
    clearProducts();
    Swal.fire({
      title: f("successStore"),
      icon: "success",
      confirmButtonColor: colors.primary,
    });
    router.push("/");
  }

  if (!user) {
    return (
      <Container>
        <h1>{f("hello")}</h1>

        <p>{f("loginGoogle")}</p>

        <button onClick={signInWithGoogle} className="google">
          <img src="/google-logo.png" alt="G" />
          {f("labelButtonGoogle")}
        </button>
      </Container>
    );
  }

  return (
    <Container>
      <h1>{f("hello")}</h1>

      <SectionProducts>
        {products.map((product) => (
          <li>
            <div>
              <img src={product.image} alt="Product" />
              <p>
                {product.name} ({product.quantity}x)
              </p>
            </div>
            <strong>
              {(parseFloat(product.price) * product.quantity).toLocaleString(
                "pt-BR",
                {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  style: "currency",
                }
              )}
            </strong>
          </li>
        ))}
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

      <button className="checkout" onClick={storeOrder}>
        {f("labelButtonCheckout")}
      </button>
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
    font-size: 25px;
  }

  .btn-finish {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  button.google {
    background: #fff;
    border: 1px solid #cacaca;
    color: #2b2b2b;
    padding: 8px 16px;
    font-size: 18px;
    border-radius: 10px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    img {
      width: 30px;
      margin-right: 20px;
    }
  }

  button.checkout {
    padding: 8px 16px;
    font-size: 18px;
    border-radius: 10px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
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

  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    position: relative;

    div {
      display: flex;
      align-items: center;
    }
    img {
      width: 100px;
      margin-right: 20px;
    }
  }

  > li:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
