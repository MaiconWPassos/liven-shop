import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 20px;
  flex-direction: column;
  height: calc(100vh - 60px);

  img {
    width: 95%;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .info h1 {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .info strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 36px;
  }

  .quantity {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
    flex-wrap: wrap;

    h1 {
      font-size: 18px;
      font-weight: 300;
      width: 100%;
    }
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

  .btn-add {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.color};
    font-weight: bold;
    margin-top: 20px;
    padding: 8px;
    border-radius: 10px;
    animation: all 0.25s linear;

    &:hover {
      opacity: 0.9;
      background-color: ${({ theme }) => theme.colors.color};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (min-width: 968px) {
    padding: 8px 150px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 48px;

    .info strong {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 48px;
    }

    img {
      max-width: 50%;
      margin-right: 50px;
    }

    .info h1 {
      margin-top: 0px;
      margin-bottom: 20px;
      font-size: 24px;
    }

    .quantity {
      margin-top: 70px;
    }

    .btn-add {
      margin-top: 50px;
    }
  }
`;
