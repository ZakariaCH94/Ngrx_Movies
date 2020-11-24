import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ElementsState } from "../../store/reducers";
import * as categoriesSelectors from "../../store/selectors";
import { Category } from "../../models";
import * as categoriesActionsType from "../../store/actions";
import { Router } from "@angular/router";
@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.css"],
})
export class CategoriesListComponent implements OnInit {
  categories$: Observable<Category[]>;
  loading$: Observable<boolean>;
  searchValue: string;
  searchValue$: Observable<string>;

  constructor(private store: Store<ElementsState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(categoriesActionsType.GET_CATEGORIES());

    this.categories$ = this.store.select<Category[]>(
      categoriesSelectors.getAllCategories
    );

    this.loading$ = this.store.select<boolean>(
      categoriesSelectors.getIsCategoriesLoading
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
      categoriesActionsType.GET_SEARCH({ searchValue: this.searchValue })
    );
  }

  goToMovies(categoryId: number) {
    this.router.navigate([`movies/category/${categoryId}`]);
  }
}
