import { Action, createReducer, on } from "@ngrx/store";
import { Movie } from "../../models";
import * as moviesAction from "../actions";

export interface moviesState {
  movies: Movie[];
  loading: boolean;
  success: string;
  error: string;
}

const initMoviesState: moviesState = {
  movies: [],
  loading: false,
  error: "",
  success: "",
};

const reducerMovies = createReducer(
  initMoviesState,
  on(moviesAction.GET_MOVIES, (state) => ({
    ...state,
    loading: true,
  })),
  on(moviesAction.GET_MOVIES_SUCCESS, (state, { movies }) => ({
    ...state,
    movies: movies,
    loading: false,
  })),
  on(moviesAction.GET_MOVIES_ERROR, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(moviesAction.ADD_MOVIE, (state, { movie }) => ({
    ...state,
    loading: true,
  })),
  on(moviesAction.ADD_MOVIE_SUCCESS, (state, { reply }) => ({
    ...state,
    success: reply,
    loading: false,
  })),
  on(moviesAction.ADD_MOVIE_ERROR, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export function moviesReducer(state: moviesState | undefined, action: Action) {
  return reducerMovies(state, action);
}

export const getAllMovies = (state: moviesState): Movie[] => state.movies;

export const getIsLoading = (state: moviesState): boolean => state.loading;
export const getError = (state: moviesState): string => state.error;

export const getSuccess = (state: moviesState): string => state.success;
