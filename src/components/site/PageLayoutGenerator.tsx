import React, { ReactElement } from "react";
import { ApplicationStateStore } from "../../state/ApplicationStateStore";
import { Page as PageModel } from "./page/Page";

export class PageLayoutGenerator {
  private pages: PageModel[] = [];

  constructor(
    private exercisesCount: number,
    private columns: number,
    private examplesPerEx: number
  ) {}

  getPageRowHeight() {
    // 2 accounts for heading and margin
    return this.examplesPerEx + 2;
  }

  getMaxPageHeight() {
    return 36;
  }

  private createNewPage() {
    const page = new PageModel(this.columns, this.examplesPerEx);
    this.pages.push(page);
    return page;
  }

  private getPage() {
    if (!this.pages.length) {
      return this.createNewPage();
    }

    return this.pages[this.pages.length - 1];
  }

  addExercise(ex: ReactElement) {
    const page = this.getPage();

    try {
      try {
        page.addExercise(ex);
      } catch (e) {
        const newPage = this.createNewPage();
        newPage.addExercise(ex);
      }
    } catch (cannot_fit) {
      throw "new_page_overfilled";
    }
  }

  getPages() {
    return this.pages;
  }

  asReactMarkup() {
    const doubleSided = ApplicationStateStore.getInstance()
      .getViewModel()
      .getState().layout.doubleSidedPrint;

    return this.pages.map((p, i) => {
      return React.cloneElement(p.asReactMarkup(), {
        key: i,
        className: doubleSided && i % 2 ? "even" : "",
      });
    });
  }
}
