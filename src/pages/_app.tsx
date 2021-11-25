import "tailwindcss/tailwind.css";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";

import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import * as locales from "../content/locale";
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
  /**
   * Identificação de paths para determinar o idioma a ser exibido
   */
  const { locale, defaultLocale, pathname } = useRouter();
  const localeCopy = locales[locale];
  const messages = localeCopy[pathname];

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <ThemeProvider theme={theme}>
        <Head>
          <title>LivenShop</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
        <ToastContainer />
      </ThemeProvider>
    </IntlProvider>
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
