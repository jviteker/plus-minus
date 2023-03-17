import { DictType, EnDict } from "./en";

export const CzDict: DictType = {
  menu: {
    options: {
      exCount: "Počet cvičení",
      examplesPerEx: "Příkladů ve cvičení",
      columns: "Počet sloupců",
      fontSize: {
        main: "Velikost písma",
        normal: "Normální",
        larger: "Větší",
        large: "Velké",
      },
      doubleSidedPrint: {
        main: "Oboustranný tisk",
        title:
          "Vykreslí sudé stránky tak, aby šly při oboustranném tisku odstříhnout výsledky.",
      },
    },
    icons: {
      settings:
        "Nastavení: Nakonfigurujte si více typů příkladů a jejich vlastnosti.",
      language: "English",
      print: "Tisknout",
    },
  },
  payload: {
    ex: "Cvičení",
  },
  settings: {
    dialogTitle: "Nastavení",
  },

  errors: {
    newPageOverfilled:
      "Omlouváme se, ale některá cvičení se nevejdou na jednu stránku. Zmenšete prosím počet příkladů ve cvičení nebo velikost písma.",
  },
  contact: {
    main: "Kontakt, podněty, připomínky, hlášení chyb",
  },

  and: "a",

  plus: {
    name: "Sčítání",
    opsCount: "Počet členů",
    min: "Min. hondota",
    max: "Max. hodnota",
    decimalDigitsCount: "Počet desetinných míst",
    resultBetween: "Výsledek mezi",
  },

  minus: {
    name: "Odčítání",
    opsCount: "Počet členů",
    operandsBetween: "Hodnoty mezi",
    decimalDigitsCount: "Počet desetinných míst",
    allowNegativeResults: "Povolit záporné výsledky",
  },
  times: {
    name: "Násobení",
    opsCount: "Počet členů",
    min: "Min. hondota",
    max: "Max. hodnota",
    decimalDigitsCount: "Počet desetinných míst",
  },
  divide: {
    name: "Dělení",
    min: "Min. hodnota výsledku nebo dělitele",
    max: "Max. hodnota výsledku nebo dělitele",
    integerResults: "Celočíselné výsledky",
    decimalDigitsCount: "Počet desetinných míst",
  },
  compare: {
    name: "Porovnávání čísel",
    min: "Min. hodnota",
    max: "Max. hodnota",
    decimalDigitsCount: "Počet desetinných míst",
  },
  fractPlus: {
    name: "Zlomky: Sčítání",
    opsCount: "Počet členů",
    nmin: "Min. hodnota dělence",
    nmax: "Max. hodnota dělence",
    dmin: "Min. hodnota dělitele",
    dmax: "Max. hodnota dělitele",
  },
};
