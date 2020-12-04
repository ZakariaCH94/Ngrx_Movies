import { Component, OnInit } from "@angular/core";
import { ElementsState } from "../../store/reducers";
import { Router, NavigationEnd } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Category } from "../../models";
import * as actionsType from "../../store/actions";
import { of } from "rxjs";
import { filter } from "rxjs/operators";
import * as categoriesSelectors from "../../store/selectors";
@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"],
})
export class AddMovieComponent implements OnInit {
  optionsCategories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;

  constructor(private store: Store<ElementsState>, private router: Router) {
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
      categoriesSelectors.getAllCategories
    );
    this.loadingCategories$ = this.store.select<boolean>(
      categoriesSelectors.getIsCategoriesLoading
    );
  }
}
