import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlideListProfileComponent, TemplateComponent } from "./containers";
import { CarrouselRoutingModule } from "./carrousel-routing.module";
import { MaterialModule } from "./material.module";
@NgModule({
  declarations: [SlideListProfileComponent, TemplateComponent],
  imports: [CommonModule, CarrouselRoutingModule, MaterialModule],
})
export class CarrouselModule {}
