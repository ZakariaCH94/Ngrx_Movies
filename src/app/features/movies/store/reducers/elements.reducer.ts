import { ActionReducerMap } from "@ngrx/store";
import * as categoriesReducer from "./categories.reducer";
import * as moviesReducer from "./movies.reducer";

// State de notre feature
export interface ElementsState {
  categories: categoriesReducer.categoriesState;
  searchCategory: categoriesReducer.searchState;
  movies: moviesReducer.moviesState;
}

// Reducers pour notre state
export const reducers: ActionReducerMap<ElementsState> = {
  categories: categoriesReducer.categoriesReducer,
  searchCategory: categoriesReducer.searchReducer,
  movies: moviesReducer.moviesReducer,
};
