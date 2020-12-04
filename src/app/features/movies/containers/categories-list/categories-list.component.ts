import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ElementsState } from "../../store/reducers";
import * as categoriesSelectors from "../../store/selectors";
import { Category } from "../../models";
import * as actionsType from "../../store/actions";
import { Router } from "@angular/router";
@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.css"],
})
export class CategoriesListComponent implements OnInit {
  categories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;
  loadingMovies$: Observable<boolean>;
  searchValue: string;
  searchValue$: Observable<string>;

  constructor(private store: Store<ElementsState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(actionsType.GET_CATEGORIES());
    this.store.dispatch(actionsType.GET_MOVIES());

    this.categories$ = this.store.select<Category[]>(
      categoriesSelectors.getAllCategories
    );

    this.loadingCategories$ = this.store.select<boolean>(
      categoriesSelectors.getIsCategoriesLoading
    );

    this.loadingMovies$ = this.store.select<boolean>(
      categoriesSelectors.getIsMoviesLoading
    );

    this.searchValue$ = this.store.select<string>(
      categoriesSelectors.getSearchValue
    );

    this.searchValue$.subscribe((searchValue) => {
      this.searchValue = searchValue;
    });
  }

  search(searchValue: string) {
    this.searchValue = searchValue;
    this.store.dispatch(
      actionsType.GET_SEARCH({ searchValue: this.searchValue })
    );
  }

  goToMovies(categoryId: number) {
    this.router.navigate([`movies/category/${categoryId}`]);
  }
}
