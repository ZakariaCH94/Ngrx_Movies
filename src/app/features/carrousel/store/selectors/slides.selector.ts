import { createSelector } from "@ngrx/store";
import { getElementsState } from "./elements.selector";
import * as reducer from "../reducers";
import { getProfileSelected } from "./profiles.selector";
import { Profile, Slide } from "../../models";
const getSlidesState = createSelector(
  getElementsState,
  (state: reducer.ElementsState) => state.slides
);

export const getAllSlides = createSelector(
  getSlidesState,
  reducer.getAllSlides
);
export const getIsSlidesLoading = createSelector(
  getSlidesState,
  reducer.getIsSlidesLoading
);
export const getIsErrorLoadSlides = createSelector(
  getSlidesState,
  reducer.getIsErrorLoadSlides
);

export const getSlidesByProfile = createSelector(
  getProfileSelected,
  getAllSlides,
  (profile: Profile, slides: Slide[]) => {
    return getSlidesByIdProfile(profile, slides);
  }
);

export const getIsLoadingActionSlide = createSelector(
  getSlidesState,
  reducer.getIsLoadingActionSlide
);

function getSlidesByIdProfile(profile: Profile, slides: Slide[]): Slide[] {
  let slidesAfterFilerByidProfile: Slide[] = [];
  let idSlidesByProfile: number[];
  console.log(profile);
  idSlidesByProfile = profile.idSlides.split(",").map((str) => parseInt(str));

  idSlidesByProfile.filter((idSlide) => {
    const slideSelected = slides.find((slide) => slide.id === idSlide);
    if (slideSelected) slidesAfterFilerByidProfile.push(slideSelected);
  });

  return slidesAfterFilerByidProfile;
}
