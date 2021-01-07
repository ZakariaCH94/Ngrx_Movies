import { createSelector } from "@ngrx/store";
import { ElementsState } from "../reducers";
import * as categoriesReducer from "../reducers/categories.reducer";
import { getElementsState } from "./elements.selector";

export const getCategoriesState = createSelector(
  getElementsState,
  (state: ElementsState) => state.categories
);

const getSearchState = createSelector(
  getElementsState,
  (state: ElementsState) => state.searchCategory
);

export const getAllCategories = createSelector(
  getCategoriesState,
  categoriesReducer.getAllCategories
);

export const getIsCategoriesLoading = createSelector(
  getCategoriesState,
  categoriesReducer.getIsCategoriesLoading
);

export const getIsErrorLoadCategories = createSelector(
  getCategoriesState,
  categoriesReducer.getIsErrorLoadCategories
);

export const getSearchValue = createSelector(
  getSearchState,
  categoriesReducer.getSearch
);
