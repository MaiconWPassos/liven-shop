import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: column;
  min-height: calc(100vh - 60px);

  h1 {
    font-size: 24px;
  }

  @media (min-width: 968px) {
    padding: 8px 150px;
    padding-top: 48px;
  }

  .total {
    width: 100%;
    text-align: right;
    font-weight: bold;
    font-size: 36px;
  }
`;

export const SectionProducts = styled.div`
  display: flex;
  padding: 8px 20px;
  flex-direction: column;

  @media (min-width: 968px) {
    margin-top: 48px;
  }

  > div:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
