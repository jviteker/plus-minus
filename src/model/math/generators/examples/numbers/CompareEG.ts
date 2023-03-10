import _ from "lodash";
import { DeepPartial } from "../../../../utils/UtilityTypes";
import { Example } from "../../../primitives/Example";
import { MNumber } from "../../../primitives/MNumber";
import { AGenerator } from "../AGenerator";

export type CompareExamplesGeneratorConfig = {
  operands: {
    min: number;
    max: number;
    decimalDigits: number;
  };
};

const Defaults: CompareExamplesGeneratorConfig = {
  operands: {
    min: 1,
    max: 10,
    decimalDigits: 0,
  },
};

export class CompareEG extends AGenerator {
  private config: CompareExamplesGeneratorConfig;

  constructor(config: DeepPartial<CompareExamplesGeneratorConfig> = {}) {
    super();
    this.config = _.merge(Defaults, config);
  }

  generate(): Example {
    const count = 2;
    const { max, min, decimalDigits } = this.config.operands;

    const n1 = MNumber.random(min, max, decimalDigits);
    let n2 = MNumber.random(min, max, decimalDigits);

    if (min >= max) {
      throw new Error("Min >= Max");
    }

    while (n2.toString() === n1.toString()) {
      n2 = MNumber.random(min, max, decimalDigits);
    }

    const operands = [n1, n2] as const;

    return Example.compare(...(operands as [MNumber, MNumber])) as Example;
  }

  static getDefaultConfig() {
    return { ...Defaults };
  }

  static sanitizeConfig(c: CompareExamplesGeneratorConfig) {
    this.clipAll(
      c,
      ["operands.min", 0, 100],
      ["operands.max", 0, 100],
      ["operands.decimalDigits", 0, 2]
    );
    this.flipMinMax(c, "operands.min", "operands.max");
  }
}
