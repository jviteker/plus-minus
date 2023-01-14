import { ApplicationStateStore } from "../ApplicationStateStore";
import { ComponentModel } from "../utils/ComponentModel";

export type ExercisesModelState = {
  count: number;
  examples: {
    count: number;
  };
};

const DefaultState: Partial<ExercisesModelState> = {
  // count of exercises
  count: 30,
  examples: {
    // count of examples per exercise
    count: 7,
  },
};

export class ExercisesModel extends ComponentModel<ExercisesModelState> {
  constructor() {
    super(DefaultState);
    this.syncFeel();
  }

  public __init(...params: any[]): void {}

  private getViewModel() {
    return ApplicationStateStore.getInstance().getViewModel();
  }

  setExamplesCount(c: number) {
    this.updateState("examples.count", c);
  }

  setExercisesCount(c: number) {
    const viewModel = this.getViewModel();

    const countBefore = this.getState().count;
    const columnsCount = viewModel.getState().layout.columns;

    const newValue =
      c < countBefore
        ? Math.floor(c / columnsCount) * columnsCount
        : Math.ceil(c / columnsCount) * columnsCount;

    this.updateState("count", newValue);
  }
}
