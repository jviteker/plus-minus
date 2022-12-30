import { Utils } from "../utils/Utils";
import { MathSymbol } from "./MathSymbol";

export class Fraction extends MathSymbol {
  private numerator: string;
  private denominator: string;

  constructor(num: string, den: string = "1") {
    const val = `${num}/${den}`;

    const tex =
      den === "1" ? `${num}` : `\\large \\frac{${num}}{${den}} \\normalsize`;

    super(val, tex);
    this.numerator = num;
    this.denominator = den;
  }

  getNumericValue() {
    return Number(this.toString());
  }

  static parse(val: string) {
    const [n, d] = val.split("/");
    return new this(n, d);
  }

  static create(n: number, d: number) {
    return new this(String(n), String(d));
  }

  static random(nmin: number, nmax: number, dmin?: number, dmax?: number) {
    const n = Utils.randomInt(nmin, nmax);
    dmin = dmin || nmin;
    dmax = dmax || nmax;
    const d = Utils.randomInt(dmin, dmax);

    return this.create(n, d);
  }
}
