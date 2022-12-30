import nerdamer from "nerdamer";
import { Formula } from "./Formula";
import { MathSymbol } from "./MathSymbol";
import { MNumber } from "./MNumber";

export class Example {
  constructor(private text: Formula, private result: Formula) {}

  getText() {
    return this.text;
  }

  getResult() {
    return this.result;
  }

  getHash() {
    return this.getText().toString();
  }

  static any() {
    return new this(
      new Formula(MNumber.random()),
      new Formula(MNumber.random())
    );
  }

  static compare(n1: MNumber, n2: MNumber) {
    const result =
      n1.getNumericValue() < n2.getNumericValue()
        ? MathSymbol.lessThan()
        : MathSymbol.greaterThan();

    return new this(
      new Formula(n1, MathSymbol.threeDots(), n2),
      new Formula(result)
    );
  }

  static numericFromFormula(
    precision: number = 0,
    ...primitives: MathSymbol[]
  ) {
    if (!primitives.length) {
      return undefined;
    }

    const formulaToCompute = new Formula(...primitives);
    const result = nerdamer(formulaToCompute.toString()).toDecimal();

    primitives.push(MathSymbol.equals());
    const textFormula = new Formula(...primitives);
    const resultFormula = new Formula(
      MNumber.create(Number(result), precision)
    );

    return new this(textFormula, resultFormula);
  }
}
