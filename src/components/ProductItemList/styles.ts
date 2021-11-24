import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  margin: 12.5px 10px;
  padding: 10px;
  border-radius: 5px;
  animation: all 0.5s ease-in;

  display: flex;
  align-items: center;

  .remove-product {
    color: ${({ theme }) => theme.colors.danger};
    font-weight: bold;
    margin-top: 50px;
  }

  .subtotal {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
  img {
    max-width: 70px;
    margin-right: 20px;
  }
  a > h1 {
    font-size: 14px;
    font-weight: 300;

    margin-bottom: 8px;
  }

  strong {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: 968px) {
    flex-direction: row;

    img {
      margin-right: 20px;
    }

    a > h1 {
      font-size: 24px;
    }

    strong {
      font-size: 18px;
    }

    img {
      max-width: 200px;
    }

    .info,
    .subtotal {
      width: 20%;
    }

    .subtotal {
      margin-left: 30px;

      h1 {
        font-weight: 300;
        font-size: 18px;
        margin-bottom: 12px;
      }
      strong {
        margin-top: 0px;
        font-size: 24px;
      }
    }
  }
`;

export const SectionQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;
  margin-left: 100px;

  h1 {
    font-size: 18px;
    font-weight: 300;
    width: 100%;
    text-align: center;
    margin-bottom: 14px;
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
`;
