export const EnDict = {
  menu: {
    options: {
      exCount: "Exercises count",
      examplesPerEx: "Examples per exercise",
      columns: "Columns",
      fontSize: {
        main: "Font size",
        normal: "Normal",
        larger: "Larger",
        large: "Large",
      },
      doubleSidedPrint: {
        main: "Double sided print",
        title:
          "Adjusts the orientation of even pages to align the cut lines for double-sided printing.",
      },
    },
    icons: {
      settings:
        "Exercises settings: Configure more exercises types and their properties.",
      language: "Česky",
    },
  },
  payload: {
    ex: "Exercise",
  },

  settings: {
    dialogTitle: "Exercises configuration",
  },

  errors: {
    newPageOverfilled:
      "Sorry, some of the exercises would not fit single page. Please decrease the count of examples per exercise or the font size.",
  },

  plus: {
    name: "Addition",
    opsCount: "Count of operands",
    min: "Min. value",
    max: "Max. value",
    decimalDigitsCount: "Count of decimal digits",
  },

  minus: {
    name: "Subtraction",
    opsCount: "Count of operands",
    min: "Min. value",
    max: "Max. value",
    decimalDigitsCount: "Count of decimal digits",
    allowNegativeResults: "Allow negative results",
  },
  times: {
    name: "Multiplication",
    opsCount: "Count of operands",
    min: "Min. value",
    max: "Max. value",
    decimalDigitsCount: "Count of decimal digits",
  },
  divide: {
    name: "Division",
    min: "Divider or result min. value",
    max: "Divider or result max. value",
    integerResults: "Integer results",
    decimalDigitsCount: "Count of decimal digits",
  },
  compare: {
    name: "Compare",
    min: "Min. value",
    max: "Max. value",
    decimalDigitsCount: "Count of decimal digits",
  },
  fractPlus: {
    name: "Fractions: Addition",
    opsCount: "Count of operands",
    nmin: "Numerator min. value",
    nmax: "Numerator max. value",
    dmin: "Denominator min. value",
    dmax: "Denominator max. value",
  },
};

export type DictType = typeof EnDict;
