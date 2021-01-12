import { createSelector } from "@ngrx/store";
import { getElementsState } from "./elements.selector";
import * as reducers from "../reducers";

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
