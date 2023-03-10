import _ from "lodash";
import { DeepPartial } from "../../../../utils/UtilityTypes";
import { Utils } from "../../../../utils/Utils";
import { Example } from "../../../primitives/Example";
import { MathSymbol } from "../../../primitives/MathSymbol";
import { MNumber } from "../../../primitives/MNumber";
import { AGenerator } from "../AGenerator";

export type DivideExamplesGeneratorConfig = {
  operands: {
    min: number;
    max: number;
    decimalDigits: number;
  };
  result: {
    integerOnly: boolean;
  };
};

const Defaults: DivideExamplesGeneratorConfig = {
  operands: {
    min: 1,
    max: 10,
    decimalDigits: 0,
  },
  result: {
    integerOnly: true,
  },
};

export class DivideEG extends AGenerator {
  private config: DivideExamplesGeneratorConfig;

  constructor(config: DeepPartial<DivideExamplesGeneratorConfig> = {}) {
    super();
    this.config = _.merge(Defaults, config);
  }

  generate(): Example {
    const { max, min, decimalDigits } = this.config.operands;
    const { integerOnly } = this.config.result;

    const operands: MNumber[] = [];

    if (integerOnly) {
      const o1 = MNumber.random(min, max, 0);
      const o2 = MNumber.random(min, max, 0);

      const result = MNumber.create(
        o1.getNumericValue() * o2.getNumericValue(),
        0
      );

      operands.push(result, o1);
    } else {
      for (let i = 0; i < 2; i++) {
        const [oMin, oMax] = [min, max];

        operands.push(MNumber.random(oMin, oMax, decimalDigits));
      }
    }

    return Example.numericFromFormula(
      integerOnly ? 0 : 2,
      ...Utils.intersperse(operands, MathSymbol.divide())
    ) as Example;
  }

  static getDefaultConfig() {
    return { ...Defaults };
  }

  static sanitizeConfig(c: DivideExamplesGeneratorConfig) {
    this.clipAll(
      c,
      ["operands.min", 0, 100],
      ["operands.max", 0, 100],
      ["operands.decimalDigits", 0, 2]
    );
    this.flipMinMax(c, "operands.min", "operands.max");
  }
}
