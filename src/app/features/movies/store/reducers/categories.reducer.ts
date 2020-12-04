import { Category } from "../../models";
import { Action, createReducer, on } from "@ngrx/store";
import * as categoriesAction from "../actions";
export interface categoriesState {
  categories: Category[];
  loading: boolean;
  error: string;
}

export interface searchState {
  serachValue: string;
}

const initCategoriesState: categoriesState = {
  categories: [],
  loading: false,
  error: "",
};

const initSearchState: searchState = {
  serachValue: "",
};

const newStateSearch = (state: searchState, newData: searchState) => {
  return Object.assign({}, state, newData);
};

const reducerCategories = createReducer(
  initCategoriesState,
  on(categoriesAction.GET_CATEGORIES, (state) => ({ ...state, loading: true })),
  on(categoriesAction.GET_CATEGORIES_SUCCESS, (state, { categories }) => ({
    ...state,
    categories: categories,
    loading: false,
  })),
  on(categoriesAction.GET_CATEGORIES_ERROR, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

const reducerSearch = createReducer(
  initSearchState,
  on(categoriesAction.GET_SEARCH, (state, { searchValue }) =>
    newStateSearch(state, {
      serachValue: searchValue,
    })
  )
);

export function categoriesReducer(
  state: categoriesState | undefined,
  action: Action
) {
  return reducerCategories(state, action);
}

export function searchReducer(state: searchState | undefined, action: Action) {
  return reducerSearch(state, action);
}

export const getAllCategories = (state: categoriesState): Category[] =>
  state.categories;
export const getIsCategoriesLoading = (state: categoriesState): boolean =>
  state.loading;
export const getIsErrorLoadCategories = (state: categoriesState): string =>
  state.error;

export const getSearch = (state: searchState): string => state.serachValue;
