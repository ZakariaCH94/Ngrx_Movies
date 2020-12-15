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
  props<{ movie: Movie }>()
);

export const ADD_MOVIE_ERROR = createAction(
  "[Movie] Add_Movie_error",
  props<{ error: string }>()
);

export const UPDATE_MOVIE = createAction(
  "[Movie] Update_Movie",
  props<{ movie: Movie }>()
);

export const UPDATE_MOVIE_SUCCESS = createAction(
  "[Movie] Update_Movie_success",
  props<{ reply: string }>()
);

export const UPDATE_MOVIE_ERROR = createAction(
  "[Movie] Update_Movie_error",
  props<{ error: string }>()
);

export const DELETE_MOVIE = createAction(
  "[Movie] Delete_Movie",
  props<{ movieId: number }>()
);

export const DELETE_MOVIE_SUCCESS = createAction(
  "[Movie] Delete_Movie_success",
  props<{ reply: string }>()
);

export const DELETE_MOVIE_ERROR = createAction(
  "[Movie] Delete_Movie_error",
  props<{ error: string }>()
);

export const ADD_OR_DELETE_MOVIE_COLLECTION = createAction(
  "[Movie] Add_Or_Delete_Movie_Collection",
  props<{ movieId: number }>()
);

export const ADD_OR_DELETE_MOVIE_COLLECTION_SUCCESS = createAction(
  "[Movie] Add_Or_Delete_Movie_Collection_success",
  props<{ reply: string }>()
);

export const ADD_OR_DELETE_MOVIE_COLLECTION_ERROR = createAction(
  "[Movie] Add_Or_Delete_Movie_Collection_error",
  props<{ error: string }>()
);
