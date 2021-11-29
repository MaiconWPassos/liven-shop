import "tailwindcss/tailwind.css";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { ServerStyleSheet } from "styled-components";
import createPersistedState from "use-persisted-state";
import { ToastContainer } from "react-toastify";

import NProgress from "nprogress";
import Router from "next/router";

/**
 * Tema de cores da aplicação
 */

import theme from "../styles/theme";
import light from "../styles/theme/light";

/**
 * Estilos Globais
 */
import GlobalStyle from "../styles/global";
import Header from "../components/Header";
import { CartProvider } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import IntlProvider from "../contexts/IntlContext";
import { AuthProvider } from "../contexts/AuthContext";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

const useThemeState = createPersistedState("theme");

function MyApp({ Component, pageProps }) {
  /**
   * Estado para controlar o loader de Carregamento da pagina
   */
  const [loading, setLoading] = useState(false);

  /**
   * Controlador de loader
   */
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);

    const start = () => {
      NProgress.start();
      setLoading(true);
    };
    const end = () => {
      NProgress.done();
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const [isDarkTheme, setIsDarkTheme] = useThemeState(false);

  return (
    <IntlProvider>
      <ThemeProvider theme={isDarkTheme ? theme : light}>
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
        <AuthProvider>
          <CartProvider>
            <Header setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme} />

            {loading ? (
              <div className="w-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-100"></div>
              </div>
            ) : (
              <>
                <Component {...pageProps} />
              </>
            )}
          </CartProvider>
        </AuthProvider>
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
    (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
  );

  const styleTags = sheet.getStyleElement();

  return { ...page, styleTags };
}
