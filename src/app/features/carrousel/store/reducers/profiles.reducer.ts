import { Profile } from "../../models";
import { Action, createReducer, on } from "@ngrx/store";
import * as profilesAction from "../actions";

export interface profilesState {
  profiles: Profile[];
  profileSelected: Profile;
  loading: boolean;
  error: string;
}
const initProfilesState: profilesState = {
  profiles: [],
  profileSelected: {
    id: null,
    name: "",
    idSlides: "",
  },
  loading: false,
  error: "",
};

const reducerProfiles = createReducer(
  initProfilesState,
  on(profilesAction.GET_PROFILES, (state) => ({ ...state, loading: true })),
  on(profilesAction.GET_PROFILES_SUCCESS, (state, { profiles }) => ({
    ...state,
    profiles: profiles,
    loading: false,
  })),
  on(profilesAction.GET_PROFILES_ERROR, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(profilesAction.GET_PROFILES_SELECTED, (state, { profile }) => ({
    ...state,
    profileSelected: profile,
  }))
);

export function profilesReducer(
  state: profilesState | undefined,
  action: Action
) {
  return reducerProfiles(state, action);
}

export const getAllProfiles = (state: profilesState): Profile[] =>
  state.profiles;

export const getIsProfilesLoading = (state: profilesState): boolean =>
  state.loading;
export const getIsErrorLoadProfiles = (state: profilesState): string =>
  state.error;

export const getProfileSelected = (state: profilesState): Profile =>
  state.profileSelected;
