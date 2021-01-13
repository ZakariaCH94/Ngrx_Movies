import { createAction, props } from "@ngrx/store";
import { Profile } from "../../models";

export const GET_PROFILES = createAction("[Profile] Get_Profiles");

export const GET_PROFILES_SUCCESS = createAction(
  "[Profile] Get_Profiles_Success",
  props<{ profiles: Profile[] }>()
);

export const GET_PROFILES_ERROR = createAction(
  "[Profile] Get_Profiles_Error",
  props<{ error: string }>()
);

export const GET_PROFILES_SELECTED = createAction(
  "[Profile] Get_Profiles_Selected",
  props<{ profile: Profile }>()
);

export const UPDATE_PROFILE_AFTER_DRAG_SLIDES = createAction(
  "[SLIDE] Update_Profile_After_Drag_Slides",
  props<{ profile: Profile }>()
);

export const UPDATE_PROFILE_AFTER_DRAG_SLIDES_SUCCESS = createAction(
  "[Slide] Update_Profile_After_Drag_Slides_Success",
  props<{ reply: string }>()
);

export const UPDATE_PROFILE_AFTER_DRAG_SLIDES_ERROR = createAction(
  "[Slide] Update_Profile_After_Drag_Slides_Error",
  props<{ error: string }>()
);
