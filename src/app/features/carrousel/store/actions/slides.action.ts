import { createAction, props } from "@ngrx/store";
import { Slide } from "../../models";

export const GET_SLIDES = createAction("[SLIDE] Get_Slides");

export const GET_SLIDES_SUCCESS = createAction(
  "[Slide] Get_Slides_Success",
  props<{ slides: Slide[] }>()
);

export const GET_SLIDES_ERROR = createAction(
  "[Slide] Get_Slides_Error",
  props<{ error: string }>()
);
