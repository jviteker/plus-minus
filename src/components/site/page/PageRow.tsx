import { ReactElement } from "react";
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
    return this.exPerRow + 2;
  }

  asReactMarkup() {
    return <Columns>{this.exercises}</Columns>;
  }
}
