import { createFeatureSelector } from "@ngrx/store";
import { ElementsState } from "../reducers";

//global state
export const getElementsState = createFeatureSelector<ElementsState>(
  "elements"
);
