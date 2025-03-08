import React from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import messages from "../locales/i18n";

const LanguageProvider = ({ children }) => {
  const locale = useSelector((state) => state.language.locale);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default LanguageProvider;
