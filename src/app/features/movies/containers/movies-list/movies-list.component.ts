import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ElementsState } from "../../store/reducers";
import * as selectors from "../../store/selectors";
import { Movie } from "../../models";
import * as actionsType from "../../store/actions";
import { of } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  movies$: Observable<Movie[]>;
  loadingMovies$: Observable<boolean>;
  loadingCategories$: Observable<boolean>;
  loadingAction$: Observable<boolean>;
  searchValue: string;
  searchValue$: Observable<string> = of("");
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();

  constructor(
    private store: Store<ElementsState>,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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
      selectors.getSelectedMoviesByIdCategory
    );
    this.loadingMovies$ = this.store.select<boolean>(
      selectors.getIsLoadingAllMovies
    );
    this.loadingCategories$ = this.store.select<boolean>(
      selectors.getIsCategoriesLoading
    );

    this.loadingAction$ = this.store.select<boolean>(
      selectors.getIsLoadingActionMovie
    );
    this.changeDetectorRef.detectChanges();

    this.movies$.subscribe((movies) => {
      this.dataSource.data = movies;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
      console.log(this.dataSource.paginator);
    });
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  search(searchValue: string) {
    this.searchValue = searchValue;
  }
  onUpdateMovie(movieId: number) {
    this.router.navigate([`movies/movie/${movieId}`]);
  }

  onDeleteMovie(movieId: number) {
    this.store.dispatch(actionsType.DELETE_MOVIE({ movieId: movieId }));
  }
}
