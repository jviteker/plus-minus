import React, { ReactElement } from "react";
import { PageRow } from "./PageRow";
import {
  Columns,
  Page as ReactPage,
  PageContent,
  VerticalCut,
} from "../../math/layout/Layout";

const MAX_PAGE_HEIGHT = 39;

export class Page {
  private rows: PageRow[] = [];

  constructor(private columns: number, private exPerRow: number) {}

  getHeight() {
    let h = 0;
    this.rows.forEach((r) => {
      h += r.getHeight();
    });

    return h;
  }

  private createRow() {
    return new PageRow(this.exPerRow);
  }

  private getFreeRow() {
    if (this.rows.length) {
      const last = this.rows[this.rows.length - 1];
      if (last.getExercises().length < this.columns) {
        return last;
      }
    }

    const newRow = this.createRow();

    const wouldBeHeight = this.getHeight() + newRow.getHeight();
    if (wouldBeHeight > MAX_PAGE_HEIGHT) {
      throw "page_overfilled";
    }

    this.rows.push(newRow);
    return newRow;
  }

  addExercise(ex: ReactElement) {
    const row = this.getFreeRow();
    row.addExercise(ex);
  }

  asReactMarkup() {
    const size = 100 / this.columns;
    const cuts = new Array(this.columns - 1).fill(0).map((x, i) => {
      return (
        <VerticalCut
          key={i}
          left={(size * (i + 1)).toFixed(2)}
        />
      );
    });

    return (
      <ReactPage>
        <PageContent>
          {cuts}
          {this.rows.map((r, i) => {
            return React.cloneElement(r.asReactMarkup(), {
              key: i,
            });
          })}
        </PageContent>
      </ReactPage>
    );
  }
}
