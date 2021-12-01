import React from "react";
import Link from "next/link";
import { Card } from "./styles";
import { Img } from "react-image";

type ProductCardPros = {
  id: string;
  name: string;
  price: string;
  image: string;
};

const myLoader = () => {
  return `https://picsum.photos/200/300`;
};

const ProductCard: React.FC<ProductCardPros> = ({ id, image, name, price }) => {
  return (
    <Link href={`/product/${id}`}>
      <Card>
        <Img
          src={image}
          alt={name}
          crossorigin="anonymous"
          loader={<img src="/product-default.png" />}
          unloader={<img src="/product-default.png" />}
        />
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
