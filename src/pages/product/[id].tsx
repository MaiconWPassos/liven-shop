import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useIntl } from "react-intl";
import { MdAdd, MdRemove } from "react-icons/md";
import useCart from "../../hooks/useCart";

import { Product as ProductType } from "../../types";

import styled from "styled-components";

const Product: React.FC = () => {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const router = useRouter();
  const { addProduct } = useCart();
  const [loader, setLoader] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const [product, setProduct] = useState<ProductType | null>(null);

  const { id } = router.query;

  async function getDataProduct(id: string) {
    const { status, data } = await axios.get<ProductType>(
      `https://5d6da1df777f670014036125.mockapi.io/api/v1/product/${id}`
    );

    if (status === 200) {
      setProduct(data);
      setLoader(false);
    }
  }

  function addProductInCart() {
    setLoader(true);
    addProduct({ ...product, quantity });

    router.push("/");
  }

  function addQuantity() {
    setQuantity(quantity + 1);
  }

  function removeQuantity() {
    if (quantity === 1) {
      return;
    }

    setQuantity(quantity - 1);
  }

  useEffect(() => {
    if (id) {
      getDataProduct(id as string);
    }
  }, [id]);

  if (loader) {
    return (
      <>
        <div className="flex justify-center items-center w-full h-full">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-100"></div>
        </div>
      </>
    );
  }
  return (
    <Container>
      <img src="http://lorempixel.com/640/480/sports/" alt="ok" />
      <div className="info">
        <div>
          <h1>{product.name}</h1>
          <strong>
            {parseFloat(product.price).toLocaleString("pt-BR", {
              currency: "BRL",
              minimumFractionDigits: 2,
              style: "currency",
            })}
          </strong>
        </div>

        <div className="quantity">
          <h1>{f("quantityLabel")}</h1>
          <button
            className="btn-quantity"
            type="button"
            onClick={removeQuantity}
          >
            <MdRemove />
          </button>
          <input
            type="number"
            className="input-quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button className="btn-quantity" type="button" onClick={addQuantity}>
            <MdAdd />
          </button>
        </div>
        <button className="btn-add" type="button" onClick={addProductInCart}>
          {f("buttonLabel")}
        </button>
      </div>
    </Container>
  );
};

export default Product;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 20px;
  flex-direction: column;
  height: calc(100vh - 60px);

  img {
    width: 95%;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .info h1 {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .info strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 36px;
  }

  .quantity {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
    flex-wrap: wrap;

    h1 {
      font-size: 18px;
      font-weight: 300;
      width: 100%;
    }
  }
  .input-quantity {
    width: 50px;
    margin: 0px 5px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.color};
    text-align: center;
  }
  .btn-quantity {
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.danger};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .btn-add {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.color};
    font-weight: bold;
    margin-top: 20px;
    padding: 8px;
    border-radius: 10px;
    animation: all 0.25s linear;

    &:hover {
      opacity: 0.9;
      background-color: ${({ theme }) => theme.colors.color};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (min-width: 968px) {
    padding: 8px 150px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 48px;

    .info strong {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 48px;
    }

    img {
      max-width: 50%;
      margin-right: 50px;
    }

    .info h1 {
      margin-top: 0px;
      margin-bottom: 20px;
      font-size: 24px;
    }

    .quantity {
      margin-top: 70px;
    }

    .btn-add {
      margin-top: 50px;
    }
  }
`;
