import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap, delay } from "rxjs/operators";
import * as categoriesActions from "../actions";
import { MoviesService } from "../../services/movies.service";
import { Router } from "@angular/router";
import { Category } from "../../models";
@Injectable()
export class CategoriesEffect {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.GET_CATEGORIES),
      mergeMap(() =>
        this.moviesService.getCategories().pipe(
          map(
            (categories: Category[]) => (
              console.log(categories),
              categoriesActions.GET_CATEGORIES_SUCCESS({
                categories: categories,
              })
            )
          ),
          catchError((err) =>
            of(categoriesActions.GET_CATEGORIES_ERROR({ error: err }))
          )
        )
      )
    )
  );

  loadCategoriesError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.GET_CATEGORIES_ERROR),
      tap(() => this.router.navigate([""]))
    )
  );
}
