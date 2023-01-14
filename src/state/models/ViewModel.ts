import { ApplicationStateStore } from "../ApplicationStateStore";
import { ComponentModel } from "../utils/ComponentModel";

export type ViewModelState = {
  fontSize: number;
  layout: {
    columns: number;
    doubleSidedPrint: boolean;
  };
};

const DefaultState: Partial<ViewModelState> = {
  fontSize: 14,
  layout: {
    doubleSidedPrint: true,
    columns: 2,
  },
};

export class ViewModel extends ComponentModel<ViewModelState> {
  constructor() {
    super(DefaultState);
  }

  public __init(...params: any[]): void {}

  private getExercisesModel() {
    return ApplicationStateStore.getInstance().getExercisesModel();
  }

  setColumnsCount(c: number) {
    const exercisesModel = this.getExercisesModel();

    const { count } = exercisesModel.getState();

    this.begin();
    this.updateState("layout.columns", c);
    exercisesModel.setExercisesCount(Math.ceil(count / c) * c);

    this.commit();
  }
}
