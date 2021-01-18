import { Injectable } from "@angular/core";
import { Profile } from "../models";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";
import * as actionsType from "../store/actions";
import { ElementsState } from "../store/reducers";
import { Store } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { Slide } from "../models";
interface SlideDto {
  slide: Slide;
  idProfiles: string;
}
@Injectable({
  providedIn: "root",
})
export class CarrouselService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<ElementsState>
  ) {}

  getProfiles() {
    return this.http.get("http://localhost:4200:/profiles");
  }

  getSlides() {
    return this.http.get("http://localhost:4200:/slides");
  }

  updateProfileAfterDragSlides(profile: Profile) {
    return this.http.put(
      "http://localhost:4200:/profile/" + profile.id,
      profile
    );
  }

  addSlide(slide: Slide, idProfiles: string) {
    const slideDto: SlideDto = {
      slide: slide,
      idProfiles: idProfiles,
    };
    console.log(slideDto);
    return this.http.post("http://localhost:4200:/slide", slideDto);
  }
  /*

  deleteMovie(movieId: number) {
    return this.http.delete("http://localhost:4200:/movie/" + movieId);
  }
  addMovieToMyCollection(movieId: number) {
    return this.http.post("http://localhost:4200:/movie/" + movieId, {});
  }
 */
  getProfilesAndSlidesAfterRefreshPage() {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.store.dispatch(actionsType.GET_PROFILES());
          this.store.dispatch(actionsType.GET_SLIDES());
        }
      });
  }
}
