import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import * as profilesActions from "../actions";
import { CarrouselService } from "../../services/carrousel.service";
import { Profile } from "../../models";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class ProfilesEffect {
  constructor(
    private actions$: Actions,
    private carrouselService: CarrouselService,
    private snackBar: MatSnackBar
  ) {}

  loadProfiles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(profilesActions.GET_PROFILES),
      mergeMap(() =>
        this.carrouselService.getProfiles().pipe(
          map(
            (profiles: Profile[]) => (
              console.log(profiles),
              profilesActions.GET_PROFILES_SUCCESS({
                profiles: profiles,
              })
            )
          ),
          catchError((err) =>
            of(profilesActions.GET_PROFILES_ERROR({ error: err.error.message }))
          )
        )
      )
    )
  );

  updateProfilesAfterDragSlides$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(profilesActions.UPDATE_PROFILE_AFTER_DRAG_SLIDES),
      map((data) => data.profile),
      mergeMap((profile: Profile) =>
        this.carrouselService.updateProfileAfterDragSlides(profile).pipe(
          map(
            (reply: string) => (
              this.snackBar.open(reply, undefined, {
                duration: 5000,
                horizontalPosition: "end",
                verticalPosition: "bottom",
              }),
              profilesActions.UPDATE_PROFILE_AFTER_DRAG_SLIDES_SUCCESS({
                reply: reply,
              })
            )
          ),
          catchError((err) =>
            of(
              profilesActions.UPDATE_PROFILE_AFTER_DRAG_SLIDES_ERROR({
                error: err.error.message,
              })
            )
          )
        )
      )
    )
  );
}
