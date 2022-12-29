import { MPrimitive } from "./MPrimitive";

export class MNumber extends MPrimitive {
  constructor(private readonly value: number) {
    super();
  }

  toString(): string {
    return String(this.value);
  }

  getNumericValue(): number {
    return this.value;
  }

  public static create(value: number): MNumber {
    return new MNumber(value);
  }
}
