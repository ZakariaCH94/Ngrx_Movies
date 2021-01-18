import { createReducer, Action, on } from "@ngrx/store";
import { Slide } from "../../models";
import * as slidesActions from "../../store/actions";

export interface slidesState {
  slides: Slide[];
  currentSlide: Slide;
  slideId: number;
  loadingAllSlides: boolean;
  loadingActionSlide: boolean;
  error: string;
}

const initSlidesState: slidesState = {
  slides: [],
  currentSlide: null,
  slideId: null,
  loadingAllSlides: false,
  loadingActionSlide: false,
  error: "",
};

const reducerSlides = createReducer(
  initSlidesState,
  on(slidesActions.GET_SLIDES, (state) => ({
    ...state,
    loadingAllSlides: true,
  })),
  on(slidesActions.GET_SLIDES_SUCCESS, (state, { slides }) => ({
    ...state,
    slides: slides,
    loadingAllSlides: false,
  })),
  on(slidesActions.GET_SLIDES_ERROR, (state, { error }) => ({
    ...state,
    loadingAllSlides: false,
    error: error,
  })),
  on(slidesActions.ADD_SLIDE_AND_UPDATE_PROFILE, (state) => {
    return {
      ...state,
      loadingActionSlide: true,
    };
  }),
  on(slidesActions.ADD_SLIDE_SUCCESS, (state, { slide }) => {
    let currentSlides = [...state.slides];
    currentSlides.push(slide);
    return {
      ...state,
      slides: currentSlides,
      loadingActionSlide: false,
    };
  }),
  on(slidesActions.ADD_SLIDE_ERROR, (state, { error }) => {
    return {
      ...state,
      loadingActionSlide: false,
      error: error,
    };
  })
);

export function slidesReducer(state: slidesState | undefined, action: Action) {
  return reducerSlides(state, action);
}

export const getAllSlides = (state: slidesState): Slide[] => state.slides;
export const getIsSlidesLoading = (state: slidesState): boolean =>
  state.loadingAllSlides;
export const getIsErrorLoadSlides = (state: slidesState): string => state.error;

export const getIsLoadingActionSlide = (state: slidesState): boolean =>
  state.loadingActionSlide;
