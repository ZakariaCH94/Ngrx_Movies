import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap, withLatestFrom } from "rxjs/operators";
import * as slidesAction from "../actions";
import { CarrouselService } from "../../services/carrousel.service";
import { Slide } from "../../models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class SlidesEffect {
  constructor(
    private actions$: Actions,
    private carrouselService: CarrouselService,
    private snackBar: MatSnackBar
  ) {}

  loadProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(slidesAction.GET_SLIDES),
      mergeMap(() =>
        this.carrouselService.getSlides().pipe(
          map(
            (slides: Slide[]) => (
              console.log(slides),
              slidesAction.GET_SLIDES_SUCCESS({
                slides: slides,
              })
            )
          ),
          catchError((err) =>
            of(slidesAction.GET_PROFILES_ERROR({ error: err }))
          )
        )
      )
    )
  );
}
