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

export const ADD_SLIDE_AND_UPDATE_PROFILE = createAction(
  "[Slide] Add_Slide",
  props<{ slide: Slide; idProfiles: string }>()
);

export const ADD_SLIDE_SUCCESS = createAction(
  "[Slide] Add_Slide_success",
  props<{ slide: Slide }>()
);

export const ADD_SLIDE_ERROR = createAction(
  "[Slide] Add_Slide_error",
  props<{ error: string }>()
);
