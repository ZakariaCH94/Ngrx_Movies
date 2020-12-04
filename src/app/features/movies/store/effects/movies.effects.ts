import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap, withLatestFrom } from "rxjs/operators";
import * as moviesActions from "../actions";
import { MoviesService } from "../../services/movies.service";
import { Movie } from "../../models";

@Injectable()
export class MoviesEffect {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.GET_MOVIES),
      mergeMap(() =>
        this.moviesService.getMovies().pipe(
          map((movies: Movie[]) =>
            moviesActions.GET_MOVIES_SUCCESS({
              movies: movies,
            })
          ),
          catchError((err) =>
            of(moviesActions.GET_MOVIES_ERROR({ error: err }))
          )
        )
      )
    )
  );
}
