import { Component, OnInit } from "@angular/core";
import { ElementsState } from "../../store/reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Movie } from "../../models";
import * as selectors from "../../store/selectors";
import { MoviesService } from "../../services";
import * as actionsType from "../../store/actions";
@Component({
  selector: "app-movie-details-container",
  templateUrl: "./movie-details-container.component.html",
  styleUrls: ["./movie-details-container.component.css"],
})
export class MovieDetailsContainerComponent implements OnInit {
  movie$: Observable<Movie>;
  loadingCategories$: Observable<boolean>;
  loadingMovies$: Observable<boolean>;
  loadingAddOrDeleteMovieToMycollection$: Observable<boolean>;
  constructor(
    private store: Store<ElementsState>,
    private moviesService: MoviesService
  ) {
    this.moviesService.getCategoriesAndMoviesAfterRefreshPage();
  }

  ngOnInit(): void {
    this.movie$ = this.store.select<Movie>(selectors.getMovieById);
    this.loadingCategories$ = this.store.select<boolean>(
      selectors.getIsCategoriesLoading
    );
    this.loadingMovies$ = this.store.select<boolean>(
      selectors.getIsLoadingAllMovies
    );
    this.loadingAddOrDeleteMovieToMycollection$ = this.store.select<boolean>(
      selectors.getIsLoadingActionMovie
    );
  }

  OnAddOrDeleteToMyCollection(movieId: number) {
    this.store.dispatch(
      actionsType.ADD_OR_DELETE_MOVIE_COLLECTION({ movieId: movieId })
    );
  }
}
