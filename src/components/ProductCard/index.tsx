import React from "react";
import Link from "next/link";
import { Card } from "./styles";

type ProductCardPros = {
  id: string;
  name: string;
  price: string;
  image: string;
};
const ProductCard: React.FC<ProductCardPros> = ({ id, image, name, price }) => {
  return (
    <Link href={`/product/${id}`}>
      <Card>
        <img src={image} alt="Product" />
        <h1>{name}</h1>

        <strong>
          {parseFloat(price).toLocaleString("pt-BR", {
            currency: "BRL",
            minimumFractionDigits: 2,
            style: "currency",
          })}
        </strong>
      </Card>
    </Link>
  );
};

export default ProductCard;
