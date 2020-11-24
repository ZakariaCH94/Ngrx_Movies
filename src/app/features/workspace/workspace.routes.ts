import { Routes } from "@angular/router";
import { TemplateComponent } from "./containers";
export const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      {
        path: "books",
        loadChildren: () => import("../books").then((m) => m.BooksModule),
      },
      {
        path: "movies",
        loadChildren: () => import("../movies").then((m) => m.MoviesModule),
      },
    ],
  },
];
