import styled from "styled-components";
import Image from "next/image";

export const Container = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.colors.headerBackground};

  @media (min-width: 968px) {
    padding: 8px 150px;

    div {
      display: flex;
      align-items: center;

      a {
        margin: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
    }
  }
`;

export const ButtonTheme = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.headerColor};
  font-size: 24px;
  position: relative;
`;

export const CartButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.headerColor};
  font-size: 24px;
  position: relative;
`;

export const AmoutProducts = styled.span`
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.headerColor};
  font-size: 8px;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -5px;
  right: -5px;
`;

export const Logo = styled(Image).attrs((props) => ({
  width: 146,
  height: 28,
}))``;
