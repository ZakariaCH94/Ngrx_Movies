import { createSelector } from "@ngrx/store";
import { ElementsState } from "../reducers";
import * as moviesReducer from "../reducers/movies.reducer";
import { getElementsState } from "./elements.selector";

const getMoviesState = createSelector(
  getElementsState,
  (state: ElementsState) => state.movies
);

export const getAllMovies = createSelector(
  getMoviesState,
  moviesReducer.getAllMovies
);

export const getIsMoviesLoading = createSelector(
  getMoviesState,
  moviesReducer.getIsMoviesLoading
);

export const getIsErrorLoadMovies = createSelector(
  getMoviesState,
  moviesReducer.getIsErrorLoadMovies
);
