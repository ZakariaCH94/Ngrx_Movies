import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models";

export const GET_MOVIES_BY_CATEGORY_ID = createAction(
  "[Movie] Get_Movies_By_Category_Id"
);

export const GET_MOVIES_BY_CATEGORY_ID_SUCCESS = createAction(
  "[Movie] Get_Movies_By_Category_Id_success",
  props<{ movies: Movie[] }>()
);

export const GET_MOVIES_BY_CATEGORY_ID_ERROR = createAction(
  "[Movie] Get_Movies_By_Category_Id_error",
  props<{ error: string }>()
);
