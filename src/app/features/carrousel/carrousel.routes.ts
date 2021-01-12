import { Routes } from "@angular/router";
import {
  SlideListProfileComponent,
  TemplateComponent,
  AddSlideComponent,
} from "./containers";

export const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      {
        path: "",
        component: SlideListProfileComponent,
      },
      {
        path: "add-slide",
        component: AddSlideComponent,
      },
    ],
  },
];
