import { IPrintable } from "../Types";

export class MathSymbol implements IPrintable {
  private readonly val: string;
  private readonly tex: string;

  constructor(val: string, tex?: string) {
    this.val = val;
    this.tex = tex || val;
  }

  toTex(): string {
    return this.tex;
  }

  toString(): string {
    return this.val;
  }

  static box() {
    return new this("□", "\\space \\large \\square \\normalsize \\space");
  }

  static threeDots() {
    return new this("...", "\\space \\dots \\space");
  }

  static lessThanOrGreaterThen() {
    return new this("?", "\\space \\scriptsize (<,>) ? \\normalsize \\space");
  }

  static plus() {
    return new this("+");
  }

  static minus() {
    return new this("-");
  }

  static times() {
    return new this("*", "\\cdot");
  }

  static divide() {
    return new this("/", ":");
  }

  static equals() {
    return new this("=");
  }

  static lessThan() {
    return new this("<");
  }

  static greaterThan() {
    return new this(">");
  }
}
