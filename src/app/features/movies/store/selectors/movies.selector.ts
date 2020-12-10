import { createSelector } from "@ngrx/store";
import { ElementsState } from "../reducers";
import * as moviesReducer from "../reducers/movies.reducer";
import { getElementsState } from "./elements.selector";
import { getRouter } from "../../router-store/router.state";
const getMoviesState = createSelector(
  getElementsState,
  (state: ElementsState) => state.movies
);

export const getAllMovies = createSelector(
  getMoviesState,
  moviesReducer.getAllMovies
);

export const getSelectedMoviesByIdCategory = createSelector(
  getRouter,
  getAllMovies,
  (router, movies) => {
    return movies.reduce((data, movie) => {
      if (movie.categoryId == router.state.params["categoryId"]) {
        data.push(movie);
      }

      return data;
    }, []);
  }
);

export const getMovieById = createSelector(
  getRouter,
  getAllMovies,
  (router, movies) => {
    return movies.find((movie) => movie.id == router.state.params["movieId"]);
  }
);

export const getIsLoadingAllMovies = createSelector(
  getMoviesState,
  moviesReducer.getIsLoadingAllMovies
);

export const getIsLoadingActionMovie = createSelector(
  getMoviesState,
  moviesReducer.getIsLoadingActionMovie
);

export const getError = createSelector(getMoviesState, moviesReducer.getError);
export const getSuccess = createSelector(
  getMoviesState,
  moviesReducer.getSuccess
);
