import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ElementsState } from "../../store/reducers";
import * as moviesSelectors from "../../store/selectors";
import { Movie } from "../../models";
import * as actionsType from "../../store/actions";
import { of } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"],
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  loadingMovies$: Observable<boolean>;
  searchValue: string;
  searchValue$: Observable<string> = of("");
  constructor(private store: Store<ElementsState>, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.store.dispatch(actionsType.GET_MOVIES());
          this.store.dispatch(actionsType.GET_CATEGORIES());
        }
      });
  }

  ngOnInit(): void {
    this.movies$ = this.store.select<Movie[]>(
      moviesSelectors.getSelectedMoviesByIdCategory
    );

    this.loadingMovies$ = this.store.select<boolean>(
      moviesSelectors.getIsLoading
    );
  }

  search(searchValue: string) {
    this.searchValue = searchValue;
  }
}
