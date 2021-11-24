import styled from "styled-components";
import Image from "next/image";

export const Container = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;

  @media (min-width: 968px) {
    padding: 8px 150px;
  }
`;

export const CartButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.color};
  font-size: 24px;
  position: relative;
`;

export const AmoutProducts = styled.span`
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.color};
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
