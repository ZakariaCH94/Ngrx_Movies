import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ElementsState } from "../../store/reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Profile, Slide } from "../../models";
import * as actionsType from "../../store/actions";
import * as selectors from "../../store/selectors";
import { CarrouselService } from "../../services";
interface data {
  slide: Slide;
  profiles: Profile[];
}
@Component({
  selector: "app-add-slide",
  templateUrl: "./add-slide.component.html",
  styleUrls: ["./add-slide.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSlideComponent implements OnInit {
  loadingProfiles$: Observable<boolean>;
  loadingSlides$: Observable<boolean>;
  profiles$: Observable<Profile[]>;
  profilesSelected$: Observable<Profile[]>;
  loadingAddSlide$: Observable<Boolean>;
  slide: Slide = {
    id: undefined,
    title: "",
    text: "",
    image: "",
    link: "",
    visible: false,
  };
  constructor(
    private store: Store<ElementsState>,
    private carrouselService: CarrouselService
  ) {
    this.carrouselService.getProfilesAndSlidesAfterRefreshPage();
  }

  ngOnInit(): void {
    this.loadingProfiles$ = this.store.select<boolean>(
      selectors.getIsProfilesLoading
    );
    this.loadingSlides$ = this.store.select<boolean>(
      selectors.getIsSlidesLoading
    );
    this.profiles$ = this.store.select<Profile[]>(selectors.getAllProfiles);
    this.loadingAddSlide$ = this.store.select<Boolean>(
      selectors.getIsLoadingActionSlide
    );
    this.profilesSelected$ = this.store.select(selectors.getProfilesSelected);
  }

  OnAddSlide(data: data) {
    const idProfiles: string = data.profiles
      .map((profile) => profile.id)
      .join();

    this.store.dispatch(
      actionsType.ADD_SLIDE_AND_UPDATE_PROFILE({
        slide: data.slide,
        idProfiles: idProfiles,
      })
    );
  }
}
