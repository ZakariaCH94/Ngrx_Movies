import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as reducers from "../../store/reducers";
import * as selectors from "../../store/selectors";
import { Observable } from "rxjs";
import { Profile, Slide } from "../../models";
import * as actions from "../../store/actions";

@Component({
  selector: "app-slide-list-profile",
  templateUrl: "./slide-list-profile.component.html",
  styleUrls: ["./slide-list-profile.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideListProfileComponent implements OnInit {
  profiles$: Observable<Profile[]>;
  slides$: Observable<Slide[]>;
  isLoadingProfiles$: Observable<boolean>;
  isLoadingSlides$: Observable<boolean>;
  profileSelected$: Observable<Profile>;

  constructor(private store: Store<reducers.ElementsState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.GET_PROFILES());
    this.store.dispatch(actions.GET_SLIDES());
    this.profiles$ = this.store.select<Profile[]>(selectors.getAllProfiles);

    this.slides$ = this.store.select<Slide[]>(selectors.getSlidesByProfile);

    this.isLoadingProfiles$ = this.store.select<boolean>(
      selectors.getIsProfilesLoading
    );
    this.isLoadingSlides$ = this.store.select<boolean>(
      selectors.getIsSlidesLoading
    );
    this.profileSelected$ = this.store.select<Profile>(
      selectors.getProfileSelected
    );
  }

  onSelectedSlidesByProfile(profile: Profile) {
    this.store.dispatch(actions.GET_PROFILES_SELECTED({ profile: profile }));
    //this.slides$ = this.store.select<Slide[]>(selectors.getSlidesByProfile);
  }
}