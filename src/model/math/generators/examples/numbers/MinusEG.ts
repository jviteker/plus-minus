import _ from "lodash";
import { DeepPartial } from "../../../../utils/UtilityTypes";
import { Utils } from "../../../../utils/Utils";
import { Example } from "../../../primitives/Example";
import { MathSymbol } from "../../../primitives/MathSymbol";
import { MNumber } from "../../../primitives/MNumber";
import { AGenerator } from "../AGenerator";

export type MinusExamplesGeneratorConfig = {
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

export class MinusEG extends AGenerator {
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

  static getDefaultConfig() {
    return { ...Defaults };
  }

  static sanitizeConfig(c: MinusExamplesGeneratorConfig) {
    this.clipAll(
      c,
      ["operands.count", 2, 5],
      ["operands.min", 0, 100],
      ["operands.max", 0, 100],
      ["operands.decimalDigits", 0, 2]
    );

    this.flipMinMax(c, "operands.min", "operands.max");
  }
}
