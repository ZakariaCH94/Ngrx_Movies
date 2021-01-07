import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  TemplateComponent,
  CategoriesListComponent,
  MoviesListComponent,
  AddMovieComponent,
  UpdateMovieComponent,
  MoviesCollectionComponent,
  MovieDetailsContainerComponent,
} from "./containers";
import {
  CategoryPreviewComponent,
  MoviePreviewComponent,
  SearchComponent,
  FormMovieComponent,
  SelectComponent,
  SelectTabObjectComponent,
  ConfirmationDialogComponent,
  MovieDetailsComponent,
} from "./components";
import { MaterialModule } from "./material.module";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MoviesService } from "./services";
import { reducers } from "./store/reducers";
import { routerReducers } from "./router-store";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { effects } from "./store/effects";
import { TitleCategoriesFilterPipe, TitleMoviesFilterPipe } from "./pipes";
import { CustomRouterStateSerializer } from "./router-store";
import { fakeBackendProvider } from "./mocks";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MediaMatcher } from "@angular/cdk/layout";

@NgModule({
  declarations: [
    TemplateComponent,
    CategoriesListComponent,
    CategoryPreviewComponent,
    SearchComponent,
    TitleCategoriesFilterPipe,
    MoviesListComponent,
    MoviePreviewComponent,
    TitleMoviesFilterPipe,
    AddMovieComponent,
    FormMovieComponent,
    SelectComponent,
    SelectComponent,
    SelectTabObjectComponent,
    UpdateMovieComponent,
    ConfirmationDialogComponent,
    MoviesCollectionComponent,
    MovieDetailsComponent,
    MovieDetailsContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature("elements", reducers),
    StoreModule.forFeature("router", routerReducers),
    EffectsModule.forRoot(),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
    }),
  ],
  providers: [MoviesService, fakeBackendProvider, MediaMatcher],
  entryComponents: [ConfirmationDialogComponent],
})
export class MoviesModule {}
