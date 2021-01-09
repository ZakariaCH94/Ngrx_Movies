import { createSelector } from "@ngrx/store";
import { ElementsState } from "../reducers";
import * as moviesReducer from "../reducers/movies.reducer";
import { getElementsState } from "./elements.selector";
import { getRouter } from "../../../shared/router-store";
import { MyRouterStateSnapshot } from "../../../shared/router-store";
import { Movie } from "../../models";

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
  (router: MyRouterStateSnapshot, movies: Movie[]) => {
    return movies.reduce((data, movie) => {
      if (movie.categoryId == router.params["categoryId"]) {
        data.push(movie);
      }

      return data;
    }, []);
  }
);

export const getMovieById = createSelector(
  getRouter,
  getAllMovies,
  (router: MyRouterStateSnapshot, movies: Movie[]) => {
    return movies.find((movie) => movie.id == router.params["movieId"]);
  }
);

export const getMyCollectionMovies = createSelector(
  getAllMovies,
  (movies: Movie[]) => {
    return movies.filter((movie) => movie.selected == true);
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
