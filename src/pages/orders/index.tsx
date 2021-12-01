import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styled from "styled-components";

import { database } from "../../services/firebase";
import { useIntl } from "react-intl";
import { Product } from "../../types";
import { formatDistance } from "date-fns";
import localePt from "date-fns/locale/pt-BR";
import localeUS from "date-fns/locale/en-US";

import { useRouter } from "next/router";

type OrderType = {
  id: string;
  date_order: number;
  products: Product[];
  total: number;
  user_id: string;
  username: string;
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const { user, signInWithGoogle } = useAuth();
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { locale } = useRouter();

  /**
   * Busca de peidos realizados pelo usuario
   */
  useEffect(() => {
    if (user?.id) {
      onValue(
        ref(database, "/orders/" + user.id),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const parsedOrders: OrderType[] = Object.entries(data).map(
              ([key, value]) => {
                const { date_order, products, total, user_id, username } =
                  value as OrderType;
                return {
                  id: key,
                  date_order,
                  products,
                  total,
                  user_id,
                  username,
                };
              }
            );

            setOrders(parsedOrders);
          }
        },
        {
          onlyOnce: true,
        }
      );
    }
  }, [user?.id]);

  if (!user) {
    return (
      <Container>
        <h1>{f("hello")}</h1>

        <p>{f("loginGoogle")}</p>

        <button onClick={signInWithGoogle} className="google">
          <img src="/google-logo.png" alt="G" />
          {f("labelButtonGoogle")}
        </button>
      </Container>
    );
  }

  return (
    <Container>
      <h1>{f("hello")}</h1>
      {orders.map((order) => (
        <div className="order" key={order.id}>
          <h6>#{order.id}</h6>
          <ul>
            {order.products.map((product: Product) => (
              <li key={product.id}>
                <span>
                  {product.name} ({product.quantity}x)
                </span>{" "}
                <strong>
                  {parseFloat(product.price).toLocaleString("pt-BR", {
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    style: "currency",
                  })}
                </strong>
              </li>
            ))}
          </ul>
          <p className="date">
            {formatDistance(order.date_order, new Date(), {
              addSuffix: true,
              locale: locale === "pt" ? localePt : localeUS,
            })}
          </p>
        </div>
      ))}
    </Container>
  );
};

export default Orders;

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

  button.google {
    background: #fff;
    border: 1px solid #cacaca;
    color: #2b2b2b;
    padding: 8px 16px;
    font-size: 18px;
    border-radius: 10px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    img {
      width: 30px;
      margin-right: 20px;
    }
  }

  .order {
    margin: 10px 0px;
    padding: 16px;
    h6 {
      font-size: 12px;
    }
    ul {
      padding: 16px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0px;
        strong {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }

    &:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;
