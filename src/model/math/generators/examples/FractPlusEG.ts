import _ from "lodash";
import nerdamer from "nerdamer";
import { DeepPartial } from "../../../utils/UtilityTypes";
import { Utils } from "../../../utils/Utils";
import { Example } from "../../primitives/Example";
import { Formula } from "../../primitives/Formula";
import { Fraction } from "../../primitives/Fraction";
import { MathSymbol } from "../../primitives/MathSymbol";
import { AGenerator } from "./AGenerator";

type FractionsPlusExamplesGeneratorConfig = {
  operands: {
    count: number;
    nmin: number;
    nmax: number;
    dmin: number;
    dmax: number;
  };
};

const Defaults: FractionsPlusExamplesGeneratorConfig = {
  operands: {
    count: 2,
    nmin: 1,
    nmax: 10,
    dmin: 2,
    dmax: 5,
  },
};

export class FractPlusEG extends AGenerator {
  private config: FractionsPlusExamplesGeneratorConfig;

  constructor(config: DeepPartial<FractionsPlusExamplesGeneratorConfig> = {}) {
    super();
    this.config = _.merge(Defaults, config);
  }

  generate(): Example {
    const { count, dmax, dmin, nmax, nmin } = this.config.operands;
    const operands: Fraction[] = [];

    for (let i = 0; i < count; i++) {
      operands.push(Fraction.random(nmin, nmax, dmin, dmax));
    }

    const operandsWithPlus = Utils.intersperse(operands, MathSymbol.plus());
    const formulaToCompute = new Formula(...operandsWithPlus);

    const result = nerdamer(formulaToCompute.toString()).toString();
    const resultFraction = Fraction.parse(result);

    return new Example(
      new Formula(...[...operandsWithPlus, MathSymbol.equals()]),
      new Formula(resultFraction)
    );
  }
}
