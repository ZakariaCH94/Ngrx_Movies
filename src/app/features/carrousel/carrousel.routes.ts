import { Routes } from "@angular/router";
import { SlideListProfileComponent, TemplateComponent } from "./containers";

export const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      {
        path: "",
        component: SlideListProfileComponent,
      },
    ],
  },
];
