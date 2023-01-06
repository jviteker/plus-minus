import { ComponentModel } from "./utils/ComponentModel";

let instance: ApplicationState;

type AppState = {
  layout: {
    columns: number;
  };
  exercises: {
    count: number;
    examples: {
      count: number;
    };
  };
};

const DefaultState: Partial<AppState> = {
  layout: {
    columns: 2,
  },
  exercises: {
    count: 30,
    examples: {
      count: 10,
    },
  },
};

export class ApplicationState extends ComponentModel<AppState> {
  constructor() {
    super(DefaultState);
  }

  public __init(...params: any[]): void {}

  getColumnsCount() {
    return this.getState().layout.columns;
  }

  setColumnsCount(c: number) {
    this.updateState("layout.columns", c);
  }

  setExamplesCount(c: number) {
    this.updateState("exercises.examples.count", c);
  }

  setExercisesCount(c: number) {
    this.updateState("exercises.count", c);
  }

  getExamplesCount() {
    return this.getState().exercises.examples.count;
  }

  static getInstance() {
    if (!instance) {
      instance = new this();
    }

    return instance;
  }
}
