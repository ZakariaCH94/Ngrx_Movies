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
