import {MNumber} from "./MNumber";
import {MSymbol} from "./MSymbol";

export class MOperator extends MSymbol {
    private readonly semantics: (a: MNumber, b: MNumber) => MNumber;

    constructor(symbol: string, semantics: (a: MNumber, b: MNumber) => MNumber) {
        super(symbol);
        this.semantics = semantics;
    }

    apply = (a: MNumber, b: MNumber): MNumber => {
        return this.semantics(a, b);
    };

    public static plus = (): MOperator => {
        return new MOperator(
            '+',
            (a, b) => {
                const result = a.getNumericValue() + b.getNumericValue();
                return new MNumber(result);
            }
        );
    };

    public static minus = (): MOperator => {
        return new MOperator(
            '-',
            (a, b) => {
                const result = a.getNumericValue() - b.getNumericValue();
                return new MNumber(result);
            }
        );
    };

    public static times = (): MOperator => {
        return new MOperator(
            '*',
            (a, b) => {
                const result = a.getNumericValue() * b.getNumericValue();
                return new MNumber(result);
            }
        );
    };

    public static divide = (): MOperator => {
        return new MOperator(
            '-',
            (a, b) => {
                const result = a.getNumericValue() / b.getNumericValue();
                return new MNumber(result);
            }
        );
    }
}
