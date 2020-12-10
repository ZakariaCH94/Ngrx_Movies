import { Routes } from "@angular/router";
import {
  AddMovieComponent,
  CategoriesListComponent,
  MoviesListComponent,
  UpdateMovieComponent,
} from "./containers";

export const routes: Routes = [
  {
    path: "",
    component: CategoriesListComponent,
  },
  {
    path: "category/:categoryId",
    component: MoviesListComponent,
  },
  {
    path: "addMovie",
    component: AddMovieComponent,
  },
  {
    path: "movie/:movieId",
    component: UpdateMovieComponent,
  },
];
