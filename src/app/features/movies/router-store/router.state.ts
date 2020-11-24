import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { Params } from "@angular/router";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

export interface MyRouterStateSnapshot {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface RouterState {
  routerReducerState: RouterReducerState<MyRouterStateSnapshot>;
}

export const routerReducers: ActionReducerMap<RouterState> = {
  routerReducerState: routerReducer,
};

export const getRouterState = createFeatureSelector<
  RouterReducerState<MyRouterStateSnapshot>
>("router");
export const getRouter = createSelector(
  getRouterState,
  (routerState: any) => routerState.routerReducerState
);
