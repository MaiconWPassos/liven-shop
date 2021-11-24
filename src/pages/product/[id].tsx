import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { MdAdd, MdRemove } from "react-icons/md";
import useCart from "../../hooks/useCart";

import { Product as ProductType } from "../../types";

import { Container } from "./styles";

const Product: React.FC = () => {
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
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
          <h1>Quantidade</h1>
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
          Adicionar ao carrinho
        </button>
      </div>
    </Container>
  );
};

export default Product;
