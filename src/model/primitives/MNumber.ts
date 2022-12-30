import { Utils } from "../utils/Utils";
import { MathSymbol } from "./MathSymbol";

export class MNumber extends MathSymbol {
  private precision: number = 0;

  constructor(val: string, tex?: string, precision: number = 0) {
    super(val, tex);
    this.precision = precision;
  }

  getNumericValue() {
    return Number(this.toString());
  }

  getPrecision() {
    return this.precision;
  }

  static create(val: number, precision: number = 0) {
    const asText = val.toFixed(precision);
    return new this(asText, undefined, precision);
  }

  public static random(
    min: number = 0,
    max: number = 10,
    precision: number = 0
  ): MNumber {
    const off = 0.5 / Math.pow(10, precision);
    const value = Utils.random(min - off, max + off);
    return this.create(value, precision);
  }
}
