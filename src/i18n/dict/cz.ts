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
          "Upraví orientaci sudých stránek tak, aby byly zarovnány čáry řezu pro oboustranný tisk.",
      },
    },
    icons: {
      settings:
        "Nastavení: Nakonfigurujte si více typů příkladů a jejich vlastnosti.",
      language: "English",
    },
  },
  payload: {
    ex: "Cvičení",
  },
  settings: {
    dialogTitle: "Nastavení",
  },
  plus: {
    name: "Sčítání",
    opsCount: "Počet členů",
    min: "Min. hondota",
    max: "Max. hodnota",
    decimalDigitsCount: "Počet desetinných míst",
  },

  minus: {
    name: "Odčítání",
    opsCount: "Počet členů",
    min: "Min. hodnota",
    max: "Max. hodnota",
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