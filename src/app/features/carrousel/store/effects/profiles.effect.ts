import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap, withLatestFrom } from "rxjs/operators";
import * as profilesActions from "../actions";
import { CarrouselService } from "../../services/carrousel.service";
import { Profile } from "../../models";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ProfilesEffect {
  constructor(
    private actions$: Actions,
    private carrouselService: CarrouselService,
    private snackBar: MatSnackBar
  ) {}

  loadProfiles$ = createEffect(() =>
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
            of(profilesActions.GET_PROFILES_ERROR({ error: err }))
          )
        )
      )
    )
  );
}
