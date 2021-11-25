import React from "react";
import Link from "next/link";
import { Card, SectionQuantity } from "./styles";
import useCart from "../../hooks/useCart";
import { MdAdd, MdRemove } from "react-icons/md";

type ProductItemListPros = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
};
const ProductItemList: React.FC<ProductItemListPros> = ({
  id,
  image,
  name,
  price,
  quantity,
}) => {
  const { removeProduct, addQuantityProduct, removeQuantityProduct } =
    useCart();

  return (
    <Card>
      <img src={image} alt="Product" />

      <div className="info">
        <Link href={`/product/${id}`}>
          <a>
            <h1>{name}</h1>
          </a>
        </Link>

        <strong>
          {parseFloat(price).toLocaleString("pt-BR", {
            currency: "BRL",
            minimumFractionDigits: 2,
            style: "currency",
          })}
        </strong>
        <br />
        <button
          className="remove-product"
          onClick={() => removeProduct(id)}
          type="button"
        >
          Excluir
        </button>
      </div>
      <SectionQuantity>
        <h1>Quantidade</h1>
        <button
          className="btn-quantity"
          type="button"
          onClick={() => removeQuantityProduct(id)}
        >
          <MdRemove />
        </button>
        <input
          type="number"
          className="input-quantity"
          defaultValue={quantity}
          readOnly
        />
        <button
          className="btn-quantity"
          type="button"
          onClick={() => addQuantityProduct(id)}
        >
          <MdAdd />
        </button>
      </SectionQuantity>

      <div className="subtotal">
        <h1>Subtotal</h1>
        <strong>
          {(parseFloat(price) * quantity).toLocaleString("pt-BR", {
            currency: "BRL",
            minimumFractionDigits: 2,
            style: "currency",
          })}
        </strong>
      </div>
    </Card>
  );
};

export default ProductItemList;
