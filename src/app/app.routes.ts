import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",

    loadChildren: () => import("./features").then((m) => m.WorkspaceModule),
  },
];
