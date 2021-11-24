import "tailwindcss/tailwind.css";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { ServerStyleSheet } from "styled-components";

/**
 * Tema de cores da aplicação
 */
import theme from "../styles/theme";

/**
 * Estilos Globais
 */
import GlobalStyle from "../styles/global";
import Header from "../components/Header";
import { CartProvider } from "../contexts/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>LivenShop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;

export function getInitialProps({ renderPage }) {
  const sheet = new ServerStyleSheet();

  const page = renderPage(
    (App) => (props) => sheet.collectStyles(<App {...props} />)
  );

  const styleTags = sheet.getStyleElement();

  return { ...page, styleTags };
}
