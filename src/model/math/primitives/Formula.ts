import { IPrintable } from "../Types";
import { MathSymbol } from "./MathSymbol";

export class Formula implements IPrintable {
  private symbols: MathSymbol[];

  constructor(...symbols: MathSymbol[]) {
    this.symbols = symbols;
  }

  toTex(): string {
    return this.symbols.map((s) => s.toTex()).join(" ");
  }
  toString(): string {
    return this.symbols.map((s) => s.toString()).join("");
  }
}
