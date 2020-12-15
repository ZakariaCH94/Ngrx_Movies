import { Routes } from "@angular/router";
import {
  AddMovieComponent,
  CategoriesListComponent,
  MoviesListComponent,
  UpdateMovieComponent,
  MovieDetailsContainerComponent,
  TemplateComponent,
  MoviesCollectionComponent,
} from "./containers";

export const routes: Routes = [
  {
    path: "",

    component: TemplateComponent,

    children: [
      {
        path: "",
        component: CategoriesListComponent,
      },
      {
        path: "category/:categoryId",
        component: MoviesListComponent,
      },
      {
        path: "add-movie",
        component: AddMovieComponent,
      },
      {
        path: "movie/:movieId",
        component: UpdateMovieComponent,
      },
      {
        path: "movie-details/:movieId",
        component: MovieDetailsContainerComponent,
      },
      {
        path: "my-collection",
        component: MoviesCollectionComponent,
      },
    ],
  },
];
