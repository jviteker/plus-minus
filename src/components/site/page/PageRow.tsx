import { ReactElement } from "react";
import { ApplicationStateStore } from "../../../state/ApplicationStateStore";
import { Columns } from "../../math/layout/Layout";

export class PageRow {
  private exercises: ReactElement[] = [];

  constructor(private exPerRow: number) {}

  getExercises() {
    return this.exercises;
  }

  addExercise(ex: ReactElement) {
    this.exercises.push(ex);
  }

  getHeight() {
    const lineHeight = ApplicationStateStore.getInstance()
      .getViewModel()
      .getState().lineHeight;

    return this.exPerRow * lineHeight + 2 * 16;
  }

  asReactMarkup() {
    return <Columns>{this.exercises}</Columns>;
  }
}
