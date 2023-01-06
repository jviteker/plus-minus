import { Utils } from "../../../utils/Utils";
import { Example } from "../../primitives/Example";
import { AGenerator } from "../examples/AGenerator";

export class ExerciseGenerator {
  constructor(private exampleGenerators: AGenerator[]) {}

  generate = (count: number = 10): Example[] => {
    const result: Example[] = [];

    let lastHash: string = "";
    let example: Example | null = null;
    let total: number = 0;

    while (result.length < count && total < 100) {
      total++;

      example = this.getRandomGenerator().generate();
      if (example.getHash() !== lastHash) {
        result.push(example);
        lastHash = example.getHash();
      }
    }

    return result;
  };

  private getRandomGenerator() {
    const i = Utils.randomInt(0, this.exampleGenerators.length - 1);
    return this.exampleGenerators[i];
  }
}
