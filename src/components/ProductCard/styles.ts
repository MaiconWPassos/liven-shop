import styled from "styled-components";

export const Card = styled.a`
  width: 220px;
  margin: 12.5px 10px;
  padding: 10px;
  border-radius: 5px;
  animation: all 0.5s ease-in;

  img {
    max-width: 200px;
  }
  h1 {
    font-size: 14px;
    font-weight: 300;
    margin-top: 14px;
    margin-bottom: 8px;
  }

  strong {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.16);
  }
`;
