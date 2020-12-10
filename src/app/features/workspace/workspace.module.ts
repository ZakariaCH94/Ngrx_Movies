import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TemplateComponent } from "./containers";
import { HeaderComponent, PanelComponent } from "./components";
import { WorkspaceRoutingModule } from "./workspace-routing.module";

@NgModule({
  declarations: [TemplateComponent, HeaderComponent, PanelComponent],
  imports: [CommonModule, WorkspaceRoutingModule],
})
export class WorkspaceModule {}
