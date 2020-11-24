import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap, withLatestFrom } from "rxjs/operators";
import * as moviesActions from "../actions";
import { MoviesService } from "../../services/movies.service";
import { Router } from "@angular/router";
import { Movie } from "../../models";
import {
  getRouter,
  MyRouterStateSnapshot,
} from "../../router-store/router.state";
@Injectable()
export class MoviesEffect {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private router: Router,
    private store: Store<MyRouterStateSnapshot>
  ) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.GET_MOVIES_BY_CATEGORY_ID),
      withLatestFrom(this.store.select<any>(getRouter), (action, payload) => {
        return {
          action: action,
          categoryId: payload.state.params["categoryId"],
        };
      }),
      mergeMap((newPayload: { action: Action; categoryId: number }) =>
        this.moviesService.getMoviesByCategoryId(newPayload.categoryId).pipe(
          map((movies: Movie[]) =>
            moviesActions.GET_MOVIES_BY_CATEGORY_ID_SUCCESS({ movies: movies })
          ),
          catchError((err) =>
            of(moviesActions.GET_MOVIES_BY_CATEGORY_ID_ERROR({ error: err }))
          )
        )
      )
    )
  );
}
