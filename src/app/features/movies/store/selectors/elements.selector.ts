import { createFeatureSelector } from "@ngrx/store";
import { ElementsState } from "../reducers";

// globalState
export const getElementsState = createFeatureSelector<ElementsState>(
  "elements"
);
