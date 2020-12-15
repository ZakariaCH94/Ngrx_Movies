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
  CategoryComponent,
  MovieComponent,
  SearchComponent,
  FormMovieComponent,
  SelectComponent,
  SelectTabObjectComponent,
  ConfirmationDialogComponent,
  MovieDetailsComponent,
} from "./components";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
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
import { MatProgressButtonsModule } from "mat-progress-buttons";
import { MediaMatcher } from "@angular/cdk/layout";

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
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressButtonsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
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
