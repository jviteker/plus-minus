import _ from "lodash";
import { DeepPartial } from "../../../../utils/UtilityTypes";
import { Utils } from "../../../../utils/Utils";
import { Example } from "../../../primitives/Example";
import { MathSymbol } from "../../../primitives/MathSymbol";
import { MNumber } from "../../../primitives/MNumber";
import { AGenerator } from "../AGenerator";

type OperandsRange = [min: number, max: number] | undefined;

export type TimesExamplesGeneratorConfig = {
  operands: {
    count: number;
    min: number;
    max: number;
    decimalDigits: number;
    ranges: OperandsRange[];
    shuffleOperands: boolean;
  };
};

const Defaults: TimesExamplesGeneratorConfig = {
  operands: {
    count: 2,
    min: 1,
    max: 10,
    decimalDigits: 0,
    shuffleOperands: false,
    // would overwrite min and max for given operand
    ranges: [],
  },
};

export class TimesEG extends AGenerator {
  private config: TimesExamplesGeneratorConfig;

  constructor(config: DeepPartial<TimesExamplesGeneratorConfig> = {}) {
    super();
    this.config = _.merge(Defaults, config);
  }

  generate(): Example {
    const { max, min, decimalDigits, count, shuffleOperands, ranges } =
      this.config.operands;
    const operands: MNumber[] = [];

    for (let i = 0; i < count; i++) {
      const [oMin, oMax] = ranges[i] || [min, max];

      operands.push(MNumber.random(oMin, oMax, decimalDigits));
    }

    if (shuffleOperands) {
      operands.sort(() => Math.random() - 0.5);
    }

    return Example.numericFromFormula(
      decimalDigits * count,
      ...Utils.intersperse(operands, MathSymbol.times())
    ) as Example;
  }

  static getDefaultConfig() {
    return { ...Defaults };
  }
}
