import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdAdd, MdRemove } from "react-icons/md";

import { Card, SectionQuantity } from "./styles";
import useCart from "../../hooks/useCart";
import { useTheme } from "styled-components";
import { useIntl } from "react-intl";

const MySwal = withReactContent(Swal);

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

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { colors } = useTheme();

  const handleRemoveProduct = (id: string) => {
    Swal.fire({
      title: "",
      text: f("confirmMessageRemove"),
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: f("confirmButtonText"),
      confirmButtonColor: colors.primary,
      denyButtonColor: colors.danger,

      denyButtonText: f("denyButtonText"),
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        removeProduct(id);

        Swal.fire(f("successRemoveMessage"), "", "success");
      }
    });
  };

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
          onClick={() => handleRemoveProduct(id)}
          type="button"
        >
          {f("removeLabel")}
        </button>
      </div>
      <SectionQuantity>
        <h1>{f("quantityLabel")}</h1>
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
          value={quantity}
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
