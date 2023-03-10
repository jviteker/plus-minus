import _ from "lodash";
import { FunctionComponent } from "react";
import { ObjectLeaves } from "../../../utils/UtilityTypes";
import { Example } from "../../primitives/Example";

export abstract class AGenerator {
  abstract generate(): Example;

  protected static clip(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  protected static clipV<T extends object>(
    c: T,
    path: ObjectLeaves<T>,
    min: number,
    max: number
  ) {
    _.set(c, path, this.clip(_.get(c, path) as number, min, max));
  }

  protected static clipAll<T extends object>(
    c: T,
    ...clips: [path: ObjectLeaves<T>, min: number, max: number][]
  ) {
    for (const clip of clips) {
      this.clipV<T>(c, ...clip);
    }
  }

  protected static flipMinMax<T extends object>(
    c: T,
    minPath: ObjectLeaves<T>,
    maxPath: ObjectLeaves<T>
  ) {
    const min = _.get(c, minPath) as number;
    const max = _.get(c, maxPath) as number;

    if (min > max) {
      _.set(c, maxPath, min);
      _.set(c, minPath, max);
    }
  }
}
