import { createSelector } from "@ngrx/store";
import { getElementsState } from "./elements.selector";
import * as reducers from "../reducers";
import { Profile } from "../../models";

const getProfilesState = createSelector(
  getElementsState,
  (state: reducers.ElementsState) => state.profiles
);

export const getAllProfiles = createSelector(
  getProfilesState,
  reducers.getAllProfiles
);

export const getIsProfilesLoading = createSelector(
  getProfilesState,
  reducers.getIsProfilesLoading
);

export const getIsErrorProfilesLoad = createSelector(
  getProfilesState,
  reducers.getIsErrorLoadProfiles
);

export const getProfileSelected = createSelector(
  getProfilesState,
  reducers.getProfileSelected
);

export const getIdProfilesSelected = createSelector(
  getProfilesState,
  reducers.getIdProfileSelected
);

export const getProfilesSelected = createSelector(
  getAllProfiles,
  getIdProfilesSelected,
  (profiles: Profile[], idProfilesSelected) => {
    let ProfilesSeleted: Profile[] = [];

    idProfilesSelected
      .split(",")
      .map((idProfile) => +idProfile)
      .forEach((idProfile) => {
        ProfilesSeleted.push(
          profiles.find((profile) => profile.id === idProfile)
        );
      });
    return ProfilesSeleted;
  }
);
