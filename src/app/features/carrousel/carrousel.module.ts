import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlideListProfileComponent, TemplateComponent } from "./containers";
import { CarrouselRoutingModule } from "./carrousel-routing.module";
import { MaterialModule } from "./material.module";
import { MediaMatcher } from "@angular/cdk/layout";
import { CarrouselService } from "./services";
import { fakeBackendProvider } from "./mocks";

@NgModule({
  declarations: [SlideListProfileComponent, TemplateComponent],
  imports: [CommonModule, CarrouselRoutingModule, MaterialModule],
  providers: [CarrouselService, fakeBackendProvider, MediaMatcher],
})
export class CarrouselModule {}
