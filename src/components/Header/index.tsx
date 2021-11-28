import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";

import Link from "next/link";
import useCart from "../../hooks/useCart";

import {
  Container,
  Logo,
  CartButton,
  AmoutProducts,
  ButtonTheme,
} from "./styles";

type HeaderProps = {
  setIsDarkTheme(value: boolean): void;
  isDarkTheme: boolean;
};

const Header: React.FC<HeaderProps> = ({ setIsDarkTheme, isDarkTheme }) => {
  const { products } = useCart();
  return (
    <Container>
      <Link href={`/`}>
        <a>
          <Logo src="/logo.png" />
        </a>
      </Link>
      <div>
        <ButtonTheme onClick={() => setIsDarkTheme(!isDarkTheme)}>
          <CgDarkMode />
        </ButtonTheme>
        <Link href={`/cart`}>
          <CartButton data-testid="button-cart">
            <MdShoppingCart />

            {products && products.length > 0 && (
              <AmoutProducts>{products.length}</AmoutProducts>
            )}
          </CartButton>
        </Link>
      </div>
    </Container>
  );
};

export default Header;
