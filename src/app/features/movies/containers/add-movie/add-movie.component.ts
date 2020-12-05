import { Component, OnInit } from "@angular/core";
import { ElementsState } from "../../store/reducers";
import { Router, NavigationEnd } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Category } from "../../models";
import * as actionsType from "../../store/actions";
import { filter } from "rxjs/operators";
import * as selectors from "../../store/selectors";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"],
})
export class AddMovieComponent implements OnInit {
  optionsCategories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;
  loadingAddMovie$: Observable<boolean>;
  success$: Subscription;
  error$: Subscription;

  constructor(
    private store: Store<ElementsState>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.store.dispatch(actionsType.GET_CATEGORIES());
        }
      });
  }

  ngOnInit(): void {
    this.optionsCategories$ = this.store.select<Category[]>(
      selectors.getAllCategories
    );
    this.loadingCategories$ = this.store.select<boolean>(
      selectors.getIsCategoriesLoading
    );
    this.loadingAddMovie$ = this.store.select<boolean>(selectors.getIsLoading);
  }
  OnAddMovie(dataMovie: any) {
    this.store.dispatch(actionsType.ADD_MOVIE({ movie: dataMovie.movie }));
  }
}
