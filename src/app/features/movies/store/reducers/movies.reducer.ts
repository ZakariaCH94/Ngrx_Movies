import { Action, createReducer, on } from "@ngrx/store";
import { Movie } from "../../models";
import * as moviesAction from "../actions";

export interface moviesState {
  movies: Movie[];
  currentMovie: Movie;
  movieId: number;
  loadingAllMovies: boolean;
  loadingActionMovie: boolean;
  success: string;
  error: string;
}

const initMoviesState: moviesState = {
  movies: [],
  currentMovie: null,
  movieId: null,
  loadingAllMovies: false,
  loadingActionMovie: false,
  error: "",
  success: "",
};

const reducerMovies = createReducer(
  initMoviesState,
  on(moviesAction.GET_MOVIES, (state) => {
    return {
      ...state,
      loadingAllMovies: true,
    };
  }),
  on(moviesAction.GET_MOVIES_SUCCESS, (state, { movies }) => {
    return {
      ...state,
      movies: movies,
      loadingAllMovies: false,
    };
  }),
  on(moviesAction.GET_MOVIES_ERROR, (state, { error }) => {
    return {
      ...state,
      loadingAllMovies: false,
      error: error,
    };
  }),
  on(moviesAction.ADD_MOVIE, (state, { movie }) => {
    return { ...state, currentMovie: movie, loadingActionMovie: true };
  }),
  on(moviesAction.ADD_MOVIE_SUCCESS, (state, { movie }) => {
    const currentMovies: Movie[] = [...state.movies];

    currentMovies.push(movie);
    return { ...state, movies: currentMovies, loadingActionMovie: false };
  }),
  on(moviesAction.ADD_MOVIE_ERROR, (state, { error }) => {
    return { ...state, loadingActionMovie: false, error: error };
  }),
  on(moviesAction.UPDATE_MOVIE, (state, { movie }) => {
    return { ...state, currentMovie: movie, loadingActionMovie: true };
  }),
  on(moviesAction.UPDATE_MOVIE_SUCCESS, (state, { reply }) => {
    const indexMovieUpdated = state.movies.findIndex(
      (movie) => movie.id === state.currentMovie.id
    );
    let currentMovies: Movie[] = [...state.movies];
    currentMovies[indexMovieUpdated] = state.currentMovie;

    return {
      ...state,
      movies: currentMovies,
      success: reply,
      loadingActionMovie: false,
    };
  }),
  on(moviesAction.UPDATE_MOVIE_ERROR, (state, { error }) => {
    return { ...state, loadingActionMovie: false, error: error };
  }),
  on(moviesAction.DELETE_MOVIE, (state, { movieId }) => {
    return { ...state, movieId: movieId, loadingActionMovie: true };
  }),
  on(moviesAction.DELETE_MOVIE_SUCCESS, (state, { reply }) => {
    const currentMovies: Movie[] = state.movies.filter(
      (movie) => movie.id !== state.movieId
    );
    return {
      ...state,
      movies: currentMovies,
      success: reply,
      loadingActionMovie: false,
    };
  }),
  on(moviesAction.DELETE_MOVIE_ERROR, (state, { error }) => {
    return { ...state, loadingActionMovie: false, error: error };
  }),
  on(moviesAction.ADD_OR_DELETE_MOVIE_COLLECTION, (state, { movieId }) => {
    return { ...state, movieId: movieId, loadingActionMovie: true };
  }),
  on(
    moviesAction.ADD_OR_DELETE_MOVIE_COLLECTION_SUCCESS,
    (state, { reply }) => {
      const currentMovie: Movie = state.movies.find(
        (movie: Movie) => movie.id == state.movieId
      );

      const currentMovieObject = Object.assign({}, currentMovie);

      currentMovieObject.selected = !currentMovieObject.selected;

      const currentMovies: Movie[] = state.movies.map((movie) => {
        if (movie.id === currentMovieObject.id) {
          movie = currentMovieObject;
        }
        return movie;
      });

      return {
        ...state,
        movies: currentMovies,
        success: reply,
        loadingActionMovie: false,
      };
    }
  ),
  on(moviesAction.ADD_OR_DELETE_MOVIE_COLLECTION_ERROR, (state, { error }) => {
    return { ...state, loadingActionMovie: false, error: error };
  })
);

export function moviesReducer(state: moviesState | undefined, action: Action) {
  return reducerMovies(state, action);
}

export const getAllMovies = (state: moviesState): Movie[] => state.movies;

export const getIsLoadingAllMovies = (state: moviesState): boolean =>
  state.loadingAllMovies;
export const getIsLoadingActionMovie = (state: moviesState): boolean =>
  state.loadingActionMovie;

export const getError = (state: moviesState): string => state.error;

export const getSuccess = (state: moviesState): string => state.success;
