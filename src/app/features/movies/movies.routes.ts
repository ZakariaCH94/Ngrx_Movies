import { Routes } from "@angular/router";
import {
  AddMovieComponent,
  CategoriesListComponent,
  MoviesListComponent,
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
];
