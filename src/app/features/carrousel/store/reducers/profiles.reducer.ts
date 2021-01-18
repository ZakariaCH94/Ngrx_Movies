import { Profile } from "../../models";
import { Action, createReducer, on } from "@ngrx/store";
import * as profilesAction from "../actions";
import { state } from "@angular/animations";

export interface profilesState {
  profiles: Profile[];
  profileSelected: Profile;
  idProfilesSelected: string;
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
  idProfilesSelected: "",
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
  ),
  on(profilesAction.ADD_SLIDE_AND_UPDATE_PROFILE, (state, { idProfiles }) => {
    return {
      ...state,
      idProfilesSelected: idProfiles,
    };
  }),
  on(
    profilesAction.UPDATE_PROFILE_AFTER_ADD_SLIDE_SUCCESS,
    (state, { idSlide }) => {
      let newStateProfileSelected: Profile = state.profileSelected;

      const idProfilesSelected: number[] = state.idProfilesSelected
        .split(",")
        .map((idString) => parseInt(idString));
      let currentProfiles = [...state.profiles];
      idProfilesSelected.filter((idProfile) => {
        const profileIndex: number = currentProfiles.findIndex(
          (profile) => profile.id === idProfile
        );
        currentProfiles[profileIndex] = { ...currentProfiles[profileIndex] };
        currentProfiles[profileIndex].idSlides =
          currentProfiles[profileIndex].idSlides + "," + idSlide;
        if (currentProfiles[profileIndex].id === state.profileSelected.id) {
          newStateProfileSelected = currentProfiles[profileIndex];
        }
      });

      return {
        ...state,
        profiles: currentProfiles,
        profileSelected: newStateProfileSelected,
      };
    }
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

export const getIdProfileSelected = (state: profilesState): string =>
  state.idProfilesSelected;
