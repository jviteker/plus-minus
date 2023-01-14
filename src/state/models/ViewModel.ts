import { ApplicationStateStore } from "../ApplicationStateStore";
import { ComponentModel } from "../utils/ComponentModel";

const ViewSizePresets = {
  normal: {
    fontSize: 16,
    lineHeight: 16,
  },
  larger: {
    fontSize: 24,
    lineHeight: 32,
  },
  large: {
    fontSize: 32,
    lineHeight: 64,
  },
} as const;

export type ViewSizePresetName = keyof typeof ViewSizePresets;

export type ViewModelState = {
  fontSize: number;
  lineHeight: number;
  presetName: ViewSizePresetName;
  layout: {
    columns: number;
    doubleSidedPrint: boolean;
  };
};

const DefaultState: Partial<ViewModelState> = {
  fontSize: 1,
  lineHeight: 1,
  presetName: "larger",
  layout: {
    doubleSidedPrint: true,
    columns: 2,
  },
};

export class ViewModel extends ComponentModel<ViewModelState> {
  constructor() {
    super(DefaultState);
    this.setViewSizePreset(DefaultState.presetName || "normal");
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

  setViewSizePreset(preset: keyof typeof ViewSizePresets) {
    const { fontSize, lineHeight } = ViewSizePresets[preset];

    this.begin();

    this.updateState("presetName", preset);
    this.updateState("fontSize", fontSize);
    this.updateState("lineHeight", lineHeight);

    this.commit();
  }

  setDoubleSidedPrint(p: boolean) {
    this.updateState("layout.doubleSidedPrint", p);
  }

  getViewSizePresetNames() {
    return Object.keys(ViewSizePresets);
  }
}
