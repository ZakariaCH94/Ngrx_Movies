import { Profile } from "../../models";
import { Action, createReducer, on } from "@ngrx/store";
import * as profilesAction from "../actions";

export interface profilesState {
  profiles: Profile[];
  profileSelected: Profile;
  currentProfile: Profile;
  loadingAllProfile: boolean;
  loadingAction: boolean;
  error: string;
  success: string;
}
const initProfilesState: profilesState = {
  profiles: [],
  profileSelected: {
    id: null,
    name: "",
    idSlides: "",
  },
  currentProfile: null,
  loadingAllProfile: false,
  loadingAction: false,
  error: "",
  success: "",
};

const reducerProfiles = createReducer(
  initProfilesState,
  on(profilesAction.GET_PROFILES, (state) => ({
    ...state,
    loadingAllProfile: true,
  })),
  on(profilesAction.GET_PROFILES_SUCCESS, (state, { profiles }) => {
    return { ...state, profiles: profiles, loadingAllProfile: false };
  }),
  on(profilesAction.GET_PROFILES_ERROR, (state, { error }) => ({
    ...state,
    error: error,
    loadingAllProfile: false,
  })),
  on(profilesAction.GET_PROFILES_SELECTED, (state, { profile }) => ({
    ...state,
    profileSelected: profile,
  })),
  on(profilesAction.UPDATE_PROFILE_AFTER_DRAG_SLIDES, (state, { profile }) => {
    return { ...state, loadingAction: true, currentProfile: profile };
  }),
  on(
    profilesAction.UPDATE_PROFILE_AFTER_DRAG_SLIDES_SUCCESS,
    (state, { reply }) => {
      const indexProfileUpdated = state.profiles.findIndex(
        (profile: Profile) => profile.id === state.currentProfile.id
      );
      let currentProfiles: Profile[] = [...state.profiles];
      currentProfiles[indexProfileUpdated] = state.currentProfile;
      console.log(currentProfiles);

      return {
        ...state,
        profiles: currentProfiles,
        profileSelected: state.currentProfile,
        loadingAction: false,
        success: reply,
      };
    }
  ),
  on(
    profilesAction.UPDATE_PROFILE_AFTER_DRAG_SLIDES_ERROR,
    (state, { error }) => ({
      ...state,
      error: error,
      loadingAction: false,
    })
  )
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
  state.loadingAllProfile;
export const getIsErrorLoadProfiles = (state: profilesState): string =>
  state.error;

export const getProfileSelected = (state: profilesState): Profile =>
  state.profileSelected;
