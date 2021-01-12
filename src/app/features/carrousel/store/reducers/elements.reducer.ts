import * as profilesReducer from "./profiles.reducer";
import * as slidesReducer from "./slides.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface ElementsState {
  profiles: profilesReducer.profilesState;
  slides: slidesReducer.slidesState;
}

export const reducer: ActionReducerMap<ElementsState> = {
  profiles: profilesReducer.profilesReducer,
  slides: slidesReducer.slidesReducer,
};
