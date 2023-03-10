// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ns1 from "locales/en/ns1.json";
import ns2 from "locales/en/ns2.json";
import { DictType, EnDict } from "../i18n/dict/en";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "translation";
    // custom resources type
    resources: {
      translation: DictType;
    };
    // other
  }
}
