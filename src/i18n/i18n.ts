import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { CzDict } from "./dict/cz";
import { EnDict } from "./dict/en";

let lang = "cz";

if (window.location.hash === "#en") {
  lang = "en";
}

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    lng: lang, // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: EnDict,
      },
      cz: {
        translation: CzDict,
      },
    },
  });

export default i18n;
