import { Action, createReducer, on } from "@ngrx/store";
import { Movie } from "../../models";
import * as moviesAction from "../actions";

export interface moviesState {
  movies: Movie[];
  loading: boolean;
  error: string;
}

const initMoviesState: moviesState = {
  movies: [],
  loading: true,
  error: "",
};

const newStateMovies = (state: moviesState, newData: moviesState) => {
  return Object.assign({}, state, newData);
};

const reducerMovies = createReducer(
  initMoviesState,
  on(moviesAction.GET_MOVIES_BY_CATEGORY_ID, (state) =>
    newStateMovies(state, {
      movies: state.movies,
      loading: true,
      error: state.error,
    })
  ),
  on(moviesAction.GET_MOVIES_BY_CATEGORY_ID_SUCCESS, (state, { movies }) =>
    newStateMovies(state, {
      movies: movies,
      loading: false,
      error: state.error,
    })
  ),
  on(moviesAction.GET_MOVIES_BY_CATEGORY_ID_ERROR, (state, { error }) =>
    newStateMovies(state, {
      movies: state.movies,
      loading: false,
      error: error,
    })
  )
);

export function moviesReducer(state: moviesState | undefined, action: Action) {
  return reducerMovies(state, action);
}

export const getAllMovies = (state: moviesState): Movie[] => state.movies;
export const getIsMoviesLoading = (state: moviesState): boolean =>
  state.loading;
export const getIsErrorLoadMovies = (state: moviesState): string => state.error;
