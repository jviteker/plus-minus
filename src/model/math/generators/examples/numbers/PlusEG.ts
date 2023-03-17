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
  result: {
    // whether setting by result or by operand is active
    active: boolean;
    min: number;
    max: number;
  };
};

const Defaults: PlusExamplesGeneratorConfig = {
  operands: {
    count: 2,
    min: 1,
    max: 10,
    decimalDigits: 0,
  },
  result: {
    active: true,
    min: 2,
    max: 20,
  },
};

export class PlusEG extends AGenerator {
  private config: PlusExamplesGeneratorConfig;

  constructor(config: DeepPartial<PlusExamplesGeneratorConfig> = {}) {
    super();
    this.config = _.merge(Defaults, config);
  }

  generate(): Example {
    const operands: MNumber[] = [];
    const byResult = this.config.result.active;
    const { decimalDigits, count } = this.config.operands;

    if (byResult) {
      const { min, max } = this.config.result;
      let result = MNumber.random(min, max, decimalDigits);
      for (let i = 0; i < count - 1; i++) {
        // this is what I subtract
        const op = MNumber.random(
          1,
          result.getNumericValue() - 1,
          decimalDigits
        );
        operands.push(op);
        result = MNumber.create(
          result.getNumericValue() - op.getNumericValue(),
          decimalDigits
        );
      }
      // it is just a remainder
      operands.push(result);
    } else {
      const { min, max } = this.config.operands;

      for (let i = 0; i < count; i++) {
        operands.push(MNumber.random(min, max, decimalDigits));
      }
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
      ["operands.decimalDigits", 0, 2],
      ["result.min", 0, 200],
      ["result.max", 0, 200]
    );

    this.flipMinMax(c, "operands.min", "operands.max");
    this.flipMinMax(c, "result.min", "result.max");
  }

  static getDefaultConfig() {
    return Defaults;
  }
}
