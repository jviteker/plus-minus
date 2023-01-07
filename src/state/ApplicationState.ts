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
    const {
      exercises: { count },
    } = this.getState();

    this.begin();
    this.updateState("layout.columns", c);
    this.updateState("exercises.count", Math.ceil(count / c) * c);
    this.commit();
  }

  setExamplesCount(c: number) {
    this.updateState("exercises.examples.count", c);
  }

  setExercisesCount(c: number) {
    const {
      layout: { columns },
      exercises: { count: countBefore },
    } = this.getState();

    const newValue =
      c < countBefore
        ? Math.floor(c / columns) * columns
        : Math.ceil(c / columns) * columns;

    this.updateState("exercises.count", newValue);
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
