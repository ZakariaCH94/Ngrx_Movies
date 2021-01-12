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
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { effects } from "./store/effects";
import { TitleCategoriesFilterPipe, TitleMoviesFilterPipe } from "./pipes";
import { fakeBackendProvider } from "./mocks";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MediaMatcher } from "@angular/cdk/layout";
import { SharedModule } from "../shared";
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
    SharedModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature("elements", reducers),
    EffectsModule.forRoot(),
    EffectsModule.forFeature(effects),
  ],
  providers: [MoviesService, fakeBackendProvider, MediaMatcher],
  entryComponents: [ConfirmationDialogComponent],
})
export class MoviesModule {}
