import { Routes } from "@angular/router";
import { TemplateComponent } from "./containers";
export const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
  },

  {
    path: "movies",
    loadChildren: () => import("../movies").then((m) => m.MoviesModule),
  },
];
