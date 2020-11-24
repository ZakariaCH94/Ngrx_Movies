import { Routes } from "@angular/router";
import {
  TemplateComponent,
  CategoriesListComponent,
  MoviesListComponent,
} from "./containers";

export const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      {
        path: "categories",
        component: CategoriesListComponent,
      },
      {
        path: "category/:categoryId",
        component: MoviesListComponent,
      },
    ],
  },
];
