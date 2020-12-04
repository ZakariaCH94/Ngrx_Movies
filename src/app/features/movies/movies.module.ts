import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  TemplateComponent,
  CategoriesListComponent,
  MoviesListComponent,
  AddMovieComponent,
} from "./containers";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import {
  CategoryComponent,
  MovieComponent,
  SearchComponent,
  FormAddMovieComponent,
  SelectComponent,
  SelectTabObjectComponent,
} from "./components";
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
import { WrapperComponent } from './components/wrapper/wrapper.component';

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
    FormAddMovieComponent,
    SelectComponent,
    SelectComponent,
    SelectTabObjectComponent,
    WrapperComponent,
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
    StoreModule.forRoot({}),
    StoreModule.forFeature("elements", reducers),
    StoreModule.forFeature("router", routerReducers),
    EffectsModule.forRoot(),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
    }),
  ],
  providers: [MoviesService, fakeBackendProvider],
})
export class MoviesModule {}
