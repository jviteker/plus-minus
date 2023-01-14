import { ExercisesModel, ExercisesModelState } from "./models/ExercisesModel";
import { ViewModel, ViewModelState } from "./models/ViewModel";
import { ComponentModel } from "./utils/ComponentModel";

let instance: ApplicationStateStore;

export type AppState = {
  view: ViewModelState;
  exercises: ExercisesModelState;
};

const DefaultState: Partial<AppState> = {};

export class ApplicationStateStore extends ComponentModel<AppState> {
  private viewModel: ViewModel;
  private exercisesModel: ExercisesModel;

  constructor() {
    super(DefaultState);
    this.viewModel = new ViewModel();
    this.exercisesModel = new ExercisesModel();

    this.syncFeel();

    this.begin();
    this.useSubModel(this.viewModel, "view", []);
    this.useSubModel(this.exercisesModel, "exercises", []);
    this.endNoCommit();
  }

  public __init(...params: any[]): void {}

  getViewModel() {
    return this.viewModel;
  }

  getExercisesModel() {
    return this.exercisesModel;
  }

  static getInstance() {
    if (!instance) {
      instance = new this();
    }

    return instance;
  }
}
