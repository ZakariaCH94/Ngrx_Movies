import { Action, createReducer, on } from "@ngrx/store";
import { Movie } from "../../models";
import * as moviesAction from "../actions";

export interface moviesState {
  movies: Movie[];
  loading: boolean;
  error: string;
  reply: string;
}

const initMoviesState: moviesState = {
  movies: [],
  loading: true,
  error: "",
  reply: "",
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
  on(moviesAction.ADD_MOVIES, (state, { movie, categoryId }) => ({
    ...state,
    loading: true,
  })),
  on(moviesAction.ADD_MOVIES_SUCCESS, (state, { reply }) => ({
    ...state,
    reply: reply,
    loading: false,
  })),
  on(moviesAction.GET_MOVIES_ERROR, (state, { error }) => ({
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
export const getIsErrorLoad = (state: moviesState): string => state.error;

export const getReplyAddMovie = (state: moviesState): string => state.reply;
