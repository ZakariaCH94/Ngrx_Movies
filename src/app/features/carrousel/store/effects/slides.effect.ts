import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";
import * as slidesActions from "../actions";
import { CarrouselService } from "../../services/carrousel.service";
import { Slide } from "../../models";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class SlidesEffect {
  constructor(
    private actions$: Actions,
    private carrouselService: CarrouselService,
    private snackBar: MatSnackBar
  ) {}

  loadSlides$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(slidesActions.GET_SLIDES),
      mergeMap(() =>
        this.carrouselService.getSlides().pipe(
          map(
            (slides: Slide[]) => (
              console.log(slides),
              slidesActions.GET_SLIDES_SUCCESS({
                slides: slides,
              })
            )
          ),
          catchError((err) =>
            of(slidesActions.GET_PROFILES_ERROR({ error: err.error.message }))
          )
        )
      )
    )
  );

  addSlide$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(slidesActions.ADD_SLIDE_AND_UPDATE_PROFILE),
      mergeMap(
        (data) => (
          console.log(data),
          this.carrouselService.addSlide(data.slide, data.idProfiles).pipe(
            switchMap(
              (slide: Slide) => (
                console.log(slide),
                this.snackBar.open(
                  "slide  " + slide.title + "  successfully added",
                  undefined,
                  {
                    duration: 5000,
                    horizontalPosition: "end",
                    verticalPosition: "bottom",
                  }
                ),
                [
                  slidesActions.ADD_SLIDE_SUCCESS({
                    slide: slide,
                  }),
                  slidesActions.UPDATE_PROFILE_AFTER_ADD_SLIDE_SUCCESS({
                    idSlide: slide.id,
                  }),
                ]
              )
            ),
            catchError(
              (err) => (
                this.snackBar.open(err.error.message, undefined, {
                  duration: 5000,
                  horizontalPosition: "end",
                  verticalPosition: "bottom",
                }),
                of(
                  slidesActions.ADD_SLIDE_ERROR({
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
