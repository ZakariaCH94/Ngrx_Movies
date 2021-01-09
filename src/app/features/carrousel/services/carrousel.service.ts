import { Injectable } from "@angular/core";
/* import { Movie } from "../models";
 */ import { HttpClient } from "@angular/common/http";
import { filter } from "rxjs/operators";
import { Router, NavigationEnd } from "@angular/router";
/* import * as actionsType from "../store/actions";
import { ElementsState } from "../store/reducers"; */
import { Store } from "@ngrx/store";
@Injectable({
  providedIn: "root",
})
export class CarrouselService {
  constructor(
    private http: HttpClient /*   private router: Router,
    private store: Store<ElementsState> */
  ) {}

  getProfiles() {
    return this.http.get("http://localhost:4200:/profiles");
  }

  getSlides() {
    return this.http.get("http://localhost:4200:/slides");
  }

  /* addMovie(movie: Movie) {
    return this.http.post("http://localhost:4200:/movie", movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put("http://localhost:4200:/movie/" + movie.id, movie);
  }

  deleteMovie(movieId: number) {
    return this.http.delete("http://localhost:4200:/movie/" + movieId);
  }
  addMovieToMyCollection(movieId: number) {
    return this.http.post("http://localhost:4200:/movie/" + movieId, {});
  }
 */
  /*   getCategoriesAndMoviesAfterRefreshPage() {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.store.dispatch(actionsType.GET_CATEGORIES());
          this.store.dispatch(actionsType.GET_MOVIES());
        }
      });
  } */
}
