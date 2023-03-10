import _ from "lodash";
import { DeepPartial } from "../../../../utils/UtilityTypes";
import { Utils } from "../../../../utils/Utils";
import { Example } from "../../../primitives/Example";
import { MathSymbol } from "../../../primitives/MathSymbol";
import { MNumber } from "../../../primitives/MNumber";
import { AGenerator } from "../AGenerator";

export type PlusExamplesGeneratorConfig = {
  operands: {
    count: number;
    min: number;
    max: number;
    decimalDigits: number;
  };
};

const Defaults: PlusExamplesGeneratorConfig = {
  operands: {
    count: 2,
    min: 1,
    max: 10,
    decimalDigits: 0,
  },
};

export class PlusEG extends AGenerator {
  private config: PlusExamplesGeneratorConfig;

  constructor(config: DeepPartial<PlusExamplesGeneratorConfig> = {}) {
    super();
    this.config = _.merge(Defaults, config);
  }

  generate(): Example {
    const { max, min, decimalDigits, count } = this.config.operands;
    const operands: MNumber[] = [];
    for (let i = 0; i < count; i++) {
      operands.push(MNumber.random(min, max, decimalDigits));
    }

    return Example.numericFromFormula(
      decimalDigits,
      ...Utils.intersperse(operands, MathSymbol.plus())
    ) as Example;
  }

  static sanitizeConfig(c: PlusExamplesGeneratorConfig) {
    this.clipAll(
      c,
      ["operands.count", 2, 5],
      ["operands.min", 0, 100],
      ["operands.max", 0, 100],
      ["operands.decimalDigits", 0, 2]
    );

    this.flipMinMax(c, "operands.min", "operands.max");
  }

  static getDefaultConfig() {
    return Defaults;
  }
}
