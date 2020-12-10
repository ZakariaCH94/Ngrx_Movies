import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap, withLatestFrom } from "rxjs/operators";
import * as moviesActions from "../actions";
import { MoviesService } from "../../services/movies.service";
import { Movie } from "../../models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class MoviesEffect {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private snackBar: MatSnackBar
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

  addMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.ADD_MOVIE),
      mergeMap(
        (action) => (
          console.log(action),
          this.moviesService.addMovie(action.movie).pipe(
            map(
              (movie: Movie) => (
                this.snackBar.open(
                  "movie  " + movie.title + "  successfully added",
                  undefined,
                  {
                    duration: 5000,
                    horizontalPosition: "end",
                    verticalPosition: "bottom",
                  }
                ),
                console.log(movie),
                moviesActions.ADD_MOVIE_SUCCESS({
                  movie: movie,
                })
              )
            ),
            catchError(
              (err) => (
                console.log(err),
                this.snackBar.open(err.error.message, undefined, {
                  duration: 5000,
                  horizontalPosition: "end",
                  verticalPosition: "bottom",
                }),
                of(moviesActions.ADD_MOVIE_ERROR({ error: err }))
              )
            )
          )
        )
      )
    )
  );

  updateMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.UPDATE_MOVIE),
      mergeMap(
        (action) => (
          console.log(action),
          this.moviesService.updateMovie(action.movie).pipe(
            map(
              (reply: string) => (
                this.snackBar.open(reply, undefined, {
                  duration: 5000,
                  horizontalPosition: "end",
                  verticalPosition: "bottom",
                }),
                console.log(reply),
                moviesActions.UPDATE_MOVIE_SUCCESS({
                  reply: reply,
                })
              )
            ),
            catchError(
              (err) => (
                console.log(err),
                this.snackBar.open(err.error.message, undefined, {
                  duration: 5000,
                  horizontalPosition: "end",
                  verticalPosition: "bottom",
                }),
                of(moviesActions.UPDATE_MOVIE_ERROR({ error: err }))
              )
            )
          )
        )
      )
    )
  );

  deleteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.DELETE_MOVIE),
      mergeMap((action) =>
        this.moviesService.deleteMovie(action.movieId).pipe(
          map(
            (reply: string) => (
              this.snackBar.open(reply, undefined, {
                duration: 5000,
                horizontalPosition: "end",
                verticalPosition: "bottom",
              }),
              console.log(reply),
              moviesActions.DELETE_MOVIE_SUCCESS({
                reply: reply,
              })
            )
          ),
          catchError(
            (err) => (
              console.log(err),
              this.snackBar.open(err.error.message, undefined, {
                duration: 5000,
                horizontalPosition: "end",
                verticalPosition: "bottom",
              }),
              of(moviesActions.DELETE_MOVIE_ERROR({ error: err }))
            )
          )
        )
      )
    )
  );
}
