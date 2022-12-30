export interface IPrintable {
  toTex(): string;
  toString(): string;
}

export interface ISymbol extends IPrintable {}
