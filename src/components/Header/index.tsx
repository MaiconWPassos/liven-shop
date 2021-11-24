import React from "react";
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import useCart from "../../hooks/useCart";

import { Container, Logo, CartButton, AmoutProducts } from "./styles";

const Header: React.FC = () => {
  const { products } = useCart();
  return (
    <Container>
      <Link href={`/`}>
        <a>
          <Logo src="/logo.png" />
        </a>
      </Link>
      <div>
        <Link href={`/cart`}>
          <CartButton>
            <MdShoppingCart />

            {products.length > 0 && (
              <AmoutProducts>{products.length}</AmoutProducts>
            )}
          </CartButton>
        </Link>
      </div>
    </Container>
  );
};

export default Header;
