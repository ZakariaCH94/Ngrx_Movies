import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models";

export const GET_MOVIES = createAction("[Movie] Get_Movies");

export const GET_MOVIES_SUCCESS = createAction(
  "[Movie] Get_Movies_success",
  props<{ movies: Movie[] }>()
);

export const GET_MOVIES_ERROR = createAction(
  "[Movie] Get_Movies_error",
  props<{ error: string }>()
);

export const ADD_MOVIE = createAction(
  "[Movie] Add_Movie",
  props<{ movie: Movie }>()
);

export const ADD_MOVIE_SUCCESS = createAction(
  "[Movie] Add_Movie_success",
  props<{ reply: string }>()
);

export const ADD_MOVIE_ERROR = createAction(
  "[Movie] Add_Movie_error",
  props<{ error: string }>()
);
