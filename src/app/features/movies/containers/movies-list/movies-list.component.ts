import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ElementsState } from "../../store/reducers";
import * as selectors from "../../store/selectors";
import { Movie } from "../../models";
import * as actionsType from "../../store/actions";
import { of } from "rxjs";
import { MoviesService } from "../../services";

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
    private changeDetectorRef: ChangeDetectorRef,
    private moviesService: MoviesService
  ) {
    this.moviesService.getCategoriesAndMoviesAfterRefreshPage();
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

  onDetailsMovie(movieId: number) {
    this.router.navigate([`movies/movie-details/${movieId}`]);
  }
}
