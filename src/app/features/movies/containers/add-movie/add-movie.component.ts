import { Component, OnInit } from "@angular/core";
import { ElementsState } from "../../store/reducers";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Category, Movie } from "../../models";
import * as actionsType from "../../store/actions";
import * as selectors from "../../store/selectors";
import { MoviesService } from "../../services";
@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"],
})
export class AddMovieComponent implements OnInit {
  movie: Movie = {
    id: undefined,
    categoryId: undefined,
    title: "",
    language: "",
    recordedYear: undefined,
    image: "",
    specialMention: {
      lastName: "",
      firstName: "",
    },
    description: "",
    selected: false,
  };

  optionsCategories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;
  loadingMovies$: Observable<boolean>;
  loadingAddMovie$: Observable<boolean>;
  success$: Subscription;
  error$: Subscription;

  constructor(
    private store: Store<ElementsState>,
    private moviesService: MoviesService
  ) {
    this.moviesService.getCategoriesAndMoviesAfterRefreshPage();
  }

  ngOnInit(): void {
    this.optionsCategories$ = this.store.select<Category[]>(
      selectors.getAllCategories
    );
    this.loadingCategories$ = this.store.select<boolean>(
      selectors.getIsCategoriesLoading
    );
    this.loadingMovies$ = this.store.select<boolean>(
      selectors.getIsLoadingAllMovies
    );
    this.loadingAddMovie$ = this.store.select<boolean>(
      selectors.getIsLoadingActionMovie
    );
  }
  OnAddMovie(dataMovie: any) {
    this.store.dispatch(actionsType.ADD_MOVIE({ movie: dataMovie.movie }));
  }
}
