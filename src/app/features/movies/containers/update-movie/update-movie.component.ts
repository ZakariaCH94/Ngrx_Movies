import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ElementsState } from "../../store/reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Movie, Category } from "../../models";
import * as selectors from "../../store/selectors";
import { filter } from "rxjs/operators";
import * as actionsType from "../../store/actions";
@Component({
  selector: "app-update-movie",
  templateUrl: "./update-movie.component.html",
  styleUrls: ["./update-movie.component.css"],
})
export class UpdateMovieComponent implements OnInit {
  movie$: Observable<Movie>;
  loadingCategories$: Observable<boolean>;
  loadingMovies$: Observable<boolean>;
  optionsCategories$: Observable<Category[]>;
  loadingUpdateMovie$: Observable<boolean>;

  constructor(private store: Store<ElementsState>, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.store.dispatch(actionsType.GET_CATEGORIES());
          this.store.dispatch(actionsType.GET_MOVIES());
        }
      });
  }

  ngOnInit(): void {
    this.movie$ = this.store.select<Movie>(selectors.getMovieById);

    this.optionsCategories$ = this.store.select<Category[]>(
      selectors.getAllCategories
    );
    this.loadingUpdateMovie$ = this.store.select<boolean>(
      selectors.getIsLoadingActionMovie
    );
    this.loadingCategories$ = this.store.select<boolean>(
      selectors.getIsCategoriesLoading
    );
    this.loadingMovies$ = this.store.select<boolean>(
      selectors.getIsLoadingAllMovies
    );
  }

  OnAddMovie(dataMovie: any) {
    this.store.dispatch(actionsType.UPDATE_MOVIE({ movie: dataMovie.movie }));
  }
}
