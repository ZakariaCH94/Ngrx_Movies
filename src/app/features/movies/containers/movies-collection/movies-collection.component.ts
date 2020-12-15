import { Component, OnInit } from "@angular/core";
import { Movie } from "../../models";
import { ElementsState } from "../../store/reducers";
import * as selectors from "../../store/selectors";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { MoviesService } from "../../services";
import { Router } from "@angular/router";

@Component({
  selector: "app-movies-collection",
  templateUrl: "./movies-collection.component.html",
  styleUrls: ["./movies-collection.component.css"],
})
export class MoviesCollectionComponent implements OnInit {
  movies$: Observable<Movie[]>;
  loadingMovies$: Observable<boolean>;
  loadingCategories$: Observable<boolean>;
  loadingDeleteMovieToMycollection$: Observable<boolean>;
  searchValue$: Observable<string> = of("");
  searchValue: string;

  constructor(
    private store: Store<ElementsState>,
    private moviesService: MoviesService,
    private router: Router
  ) {
    this.moviesService.getCategoriesAndMoviesAfterRefreshPage();
  }

  ngOnInit(): void {
    this.movies$ = this.store.select<Movie[]>(selectors.getMyCollectionMovies);
    this.loadingCategories$ = this.store.select<boolean>(
      selectors.getIsCategoriesLoading
    );
    this.loadingMovies$ = this.store.select<boolean>(
      selectors.getIsLoadingAllMovies
    );
    this.loadingDeleteMovieToMycollection$ = this.store.select<boolean>(
      selectors.getIsLoadingActionMovie
    );
  }

  search(searchValue: string) {
    this.searchValue = searchValue;
  }

  onDetailsMovie(movieId: number) {
    this.router.navigate([`movies/movie-details/${movieId}`]);
  }
}
