import { Routes } from "@angular/router";
import { FindBookComponent, TemplateComponent } from "./containers";

export const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      {
        path: "findBook",
        component: FindBookComponent,
      },
    ],
  },
];
