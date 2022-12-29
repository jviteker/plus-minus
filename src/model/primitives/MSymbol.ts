import { MPrimitive } from "./MPrimitive";

export class MSymbol extends MPrimitive {
  private readonly symbol: string;

  constructor(symbol: string) {
    super();
    this.symbol = symbol;
  }

  toString() {
    return String(this.symbol);
  }

  public static equals = (): MSymbol => {
    return new MSymbol("=");
  };

  public static lessThan = (): MSymbol => {
    return new MSymbol("<");
  };

  public static greaterThan = (): MSymbol => {
    return new MSymbol(">");
  };
}
