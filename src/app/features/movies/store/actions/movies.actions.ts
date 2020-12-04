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

export const ADD_MOVIES = createAction(
  "[Movie] Add_Movies_success",
  props<{ movie: Movie; categoryId: number }>()
);

export const ADD_MOVIES_SUCCESS = createAction(
  "[Movie] Add_Movies_success",
  props<{ reply: string }>()
);

export const Add_MOVIES_ERROR = createAction(
  "[Movie] Get_Movies_error",
  props<{ error: string }>()
);
