import _ from "lodash";
import { Example } from "../../../primitives/Example";
import { MathSymbol } from "../../../primitives/MathSymbol";
import { MNumber } from "../../../primitives/MNumber";
import { DeepPartial, Utils } from "../../../utils/Utils";
import { AGenerator } from "../AGenerator";

type MinusExamplesGeneratorConfig = {
  operands: {
    count: number;
    min: number;
    max: number;
    decimalDigits: number;
  };
  result: {
    allowNegative: boolean;
  };
};

const Defaults: MinusExamplesGeneratorConfig = {
  operands: {
    count: 2,
    min: 1,
    max: 10,
    decimalDigits: 0,
  },
  result: {
    allowNegative: false,
  },
};

export class MinusExamplesGenerator extends AGenerator {
  private config: MinusExamplesGeneratorConfig;

  constructor(config: DeepPartial<MinusExamplesGeneratorConfig> = {}) {
    super();
    this.config = _.merge(Defaults, config);
  }

  generate(): Example {
    const { max, min, decimalDigits, count } = this.config.operands;
    const operands: MNumber[] = [];
    for (let i = 0; i < count; i++) {
      operands.push(MNumber.random(min, max, decimalDigits));
    }

    // sort operands to produce positive result
    if (count === 2 && !this.config.result.allowNegative) {
      operands.sort((a, b) => b.getNumericValue() - a.getNumericValue());
    }

    return Example.numericFromFormula(
      decimalDigits,
      ...Utils.intersperse(operands, MathSymbol.minus())
    ) as Example;
  }
}
