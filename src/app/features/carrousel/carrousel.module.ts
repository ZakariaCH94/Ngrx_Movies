import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {
  SlideListProfileComponent,
  TemplateComponent,
  AddSlideComponent,
} from "./containers";
import { CarrouselRoutingModule } from "./carrousel-routing.module";
import { MaterialModule } from "./material.module";
import { MediaMatcher } from "@angular/cdk/layout";
import { CarrouselService } from "./services";
import { fakeBackendProvider } from "./mocks";
import { SharedModule } from "../shared";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducer } from "./store/reducers";
import { effects } from "./store/effects";
import {
  SelectComponent,
  SlideDragAndDropComponent,
  FormSlideComponent,
  SelectMultipleComponent,
} from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ProfileSlidesPipe } from "./pipes";

@NgModule({
  declarations: [
    SlideListProfileComponent,
    TemplateComponent,
    SelectComponent,
    SlideDragAndDropComponent,
    ProfileSlidesPipe,
    AddSlideComponent,
    FormSlideComponent,
    SelectMultipleComponent,
  ],
  imports: [
    CommonModule,
    CarrouselRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DragDropModule,
    SharedModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature("elements", reducer),
    EffectsModule.forRoot(),
    EffectsModule.forFeature(effects),
  ],
  providers: [CarrouselService, fakeBackendProvider, MediaMatcher],
})
export class CarrouselModule {}
