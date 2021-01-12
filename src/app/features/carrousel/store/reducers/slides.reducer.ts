import { createReducer, Action, on } from "@ngrx/store";
import { Slide } from "../../models";
import * as slidesActions from "../../store/actions";

export interface slidesState {
  slides: Slide[];
  currentSlide: Slide;
  movieId: number;
  loadingAllMovies: boolean;
  loadingActionMovie: boolean;
  error: string;
}

const initSlidesState: slidesState = {
  slides: [],
  currentSlide: null,
  movieId: null,
  loadingAllMovies: false,
  loadingActionMovie: false,
  error: "",
};

const reducerSlides = createReducer(
  initSlidesState,
  on(slidesActions.GET_SLIDES, (state) => ({
    ...state,
    loadingAllMovies: true,
  })),
  on(slidesActions.GET_SLIDES_SUCCESS, (state, { slides }) => ({
    ...state,
    slides: slides,
    loadingAllMovies: false,
  })),
  on(slidesActions.GET_SLIDES_ERROR, (state, { error }) => ({
    ...state,
    loadingAllMovies: false,
    error: error,
  }))
);

export function slidesReducer(state: slidesState | undefined, action: Action) {
  return reducerSlides(state, action);
}

export const getAllSlides = (state: slidesState): Slide[] => state.slides;
export const getIsSlidesLoading = (state: slidesState): boolean =>
  state.loadingAllMovies;
export const getIsErrorLoadSlides = (state: slidesState): string => state.error;
