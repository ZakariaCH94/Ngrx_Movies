import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  TemplateComponent,
  CategoriesListComponent,
  MoviesListComponent,
} from "./containers";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  CategoryComponent,
  MovieComponent,
  SearchComponent,
} from "./components";
import { MoviesService } from "./services";
import { reducers } from "./store/reducers";
import { routerReducers } from "./router-store";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from "@ngrx/router-store";
import { effects } from "./store/effects";
import { TitleCategoriesFilterPipe, TitleMoviesFilterPipe } from "./pipes";
import { CustomRouterStateSerializer } from "./router-store";

@NgModule({
  declarations: [
    TemplateComponent,
    CategoriesListComponent,
    CategoryComponent,
    SearchComponent,
    TitleCategoriesFilterPipe,
    MoviesListComponent,
    MovieComponent,
    TitleMoviesFilterPipe,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature("elements", reducers),
    StoreModule.forFeature("router", routerReducers),
    EffectsModule.forRoot(),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    MoviesService,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
  ],
})
export class MoviesModule {}
