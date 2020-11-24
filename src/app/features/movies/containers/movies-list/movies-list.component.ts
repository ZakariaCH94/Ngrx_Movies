import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ElementsState } from "../../store/reducers";
import * as moviesSelectors from "../../store/selectors";
import { Movie } from "../../models";
import * as moviesActionsType from "../../store/actions";
import { of } from "rxjs";
@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"],
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  searchValue: string;
  searchValue$: Observable<string> = of("");
  constructor(private store: Store<ElementsState>) {}

  ngOnInit(): void {
    this.store.dispatch(moviesActionsType.GET_MOVIES_BY_CATEGORY_ID());

    this.movies$ = this.store.select<Movie[]>(moviesSelectors.getAllMovies);
    this.loading$ = this.store.select<boolean>(
      moviesSelectors.getIsMoviesLoading
    );
    this.error$ = this.store.select<string>(
      moviesSelectors.getIsErrorLoadMovies
    );
  }

  search(searchValue: string) {
    this.searchValue = searchValue;
  }
}
