import { useRouter } from "next/router";
import React from "react";
import { IntlProvider as Provider } from "react-intl";
import * as locales from "../content/locale";

// import { Container } from './styles';

const IntlProvider: React.FC = ({ children }) => {
  /**
   * Identificação de paths para determinar o idioma a ser exibido
   */
  const { locale, defaultLocale, pathname } = useRouter();
  const localeCopy = locales[locale];
  const messages = localeCopy[pathname];

  return (
    <Provider locale={locale} defaultLocale={defaultLocale} messages={messages}>
      {children}
    </Provider>
  );
};

export default IntlProvider;
