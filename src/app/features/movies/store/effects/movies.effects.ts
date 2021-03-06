import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
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

  loadMovies$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.GET_MOVIES),
      mergeMap(() =>
        this.moviesService.getMovies().pipe(
          map(
            (movies: Movie[]) => (
              console.log(movies),
              moviesActions.GET_MOVIES_SUCCESS({
                movies: movies,
              })
            )
          ),
          catchError((err) =>
            of(moviesActions.GET_MOVIES_ERROR({ error: err.error.message }))
          )
        )
      )
    )
  );

  addMovies$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.ADD_MOVIE),
      mergeMap(
        (data) => (
          console.log(data),
          this.moviesService.addMovie(data.movie).pipe(
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
                of(moviesActions.ADD_MOVIE_ERROR({ error: err.error.message }))
              )
            )
          )
        )
      )
    )
  );

  updateMovies$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.UPDATE_MOVIE),
      mergeMap(
        (data) => (
          console.log(data),
          this.moviesService.updateMovie(data.movie).pipe(
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
                of(
                  moviesActions.UPDATE_MOVIE_ERROR({ error: err.error.message })
                )
              )
            )
          )
        )
      )
    )
  );

  deleteMovies$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.DELETE_MOVIE),
      mergeMap((data) =>
        this.moviesService.deleteMovie(data.movieId).pipe(
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
              of(moviesActions.DELETE_MOVIE_ERROR({ error: err.error.message }))
            )
          )
        )
      )
    )
  );
  addMovieToMyCollection$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.ADD_OR_DELETE_MOVIE_COLLECTION),
      mergeMap(
        (data) => (
          console.log(data),
          this.moviesService.addMovieToMyCollection(data.movieId).pipe(
            map(
              (reply: string) => (
                this.snackBar.open(reply, undefined, {
                  duration: 5000,
                  horizontalPosition: "end",
                  verticalPosition: "bottom",
                }),
                console.log(reply),
                moviesActions.ADD_OR_DELETE_MOVIE_COLLECTION_SUCCESS({
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
                of(
                  moviesActions.ADD_OR_DELETE_MOVIE_COLLECTION_ERROR({
                    error: err.error.message,
                  })
                )
              )
            )
          )
        )
      )
    )
  );
}
