import { createAction, props } from "@ngrx/store";
import { Category } from "../../models";

export const GET_CATEGORIES = createAction("[Category] Get_Categories");

export const GET_CATEGORIES_SUCCESS = createAction(
  "[Category] Get_Categories_success",
  props<{ categories: Category[] }>()
);

export const GET_CATEGORIES_ERROR = createAction(
  "[Category] Get_Categories_error",
  props<{ error: string }>()
);

export const GET_SEARCH = createAction(
  "[Category] Get_Search",
  props<{ searchValue: string }>()
);
