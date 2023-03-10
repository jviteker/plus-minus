import {
  FractionsPlusExamplesGeneratorConfig,
  FractPlusEG,
} from "../../model/math/generators/examples/FractPlusEG";
import {
  CompareEG,
  CompareExamplesGeneratorConfig,
} from "../../model/math/generators/examples/numbers/CompareEG";
import {
  DivideEG,
  DivideExamplesGeneratorConfig,
} from "../../model/math/generators/examples/numbers/DivideEG";
import {
  MinusEG,
  MinusExamplesGeneratorConfig,
} from "../../model/math/generators/examples/numbers/MinusEG";
import {
  PlusEG,
  PlusExamplesGeneratorConfig,
} from "../../model/math/generators/examples/numbers/PlusEG";
import {
  TimesEG,
  TimesExamplesGeneratorConfig,
} from "../../model/math/generators/examples/numbers/TimesEG";
import { ApplicationStateStore } from "../ApplicationStateStore";
import { ComponentModel } from "../utils/ComponentModel";

type GeneratorConfig<T> = {
  active: boolean;
  config: T;
};

export type ExercisesModelState = {
  count: number;
  examples: {
    count: number;
  };
  generators: {
    plus: GeneratorConfig<PlusExamplesGeneratorConfig>;
    minus: GeneratorConfig<MinusExamplesGeneratorConfig>;
    times: GeneratorConfig<TimesExamplesGeneratorConfig>;
    divide: GeneratorConfig<DivideExamplesGeneratorConfig>;
    compare: GeneratorConfig<CompareExamplesGeneratorConfig>;
    fractPlus: GeneratorConfig<FractionsPlusExamplesGeneratorConfig>;
  };
};

const DefaultState: Partial<ExercisesModelState> = {
  // count of exercises
  count: 12,
  examples: {
    // count of examples per exercise
    count: 7,
  },

  generators: {
    plus: {
      active: true,
      config: PlusEG.getDefaultConfig(),
    },
    minus: {
      active: true,
      config: MinusEG.getDefaultConfig(),
    },
    times: {
      active: false,
      config: TimesEG.getDefaultConfig(),
    },
    divide: {
      active: false,
      config: DivideEG.getDefaultConfig(),
    },
    compare: {
      active: false,
      config: CompareEG.getDefaultConfig(),
    },
    fractPlus: {
      active: false,
      config: FractPlusEG.getDefaultConfig(),
    },
  },
};

const COUNT_MAX = 100;

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
    this.updateState("examples.count", this.clip(c, 1, 36));
  }

  setExercisesCount(c: number) {
    const viewModel = this.getViewModel();

    c = this.clip(c, 1, 100);

    const countBefore = this.getState().count;
    const columnsCount = viewModel.getState().layout.columns;

    const newValue =
      c < countBefore
        ? Math.floor(c / columnsCount) * columnsCount
        : Math.ceil(c / columnsCount) * columnsCount;

    this.updateState("count", newValue);
  }

  setGeneratorConfig<K extends keyof ExercisesModelState["generators"]>(
    generator: K,
    config: ExercisesModelState["generators"][K]["config"]
  ) {
    this.updateState(`generators.${generator}.config`, config);
  }

  setGeneratorActive<K extends keyof ExercisesModelState["generators"]>(
    generator: K,
    active: boolean
  ) {
    this.updateState(`generators.${generator}.active`, active);
  }
}
