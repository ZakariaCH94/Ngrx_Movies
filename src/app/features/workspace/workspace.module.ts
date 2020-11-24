import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent, TemplateComponent } from "./containers";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { WorkspaceRoutingModule } from "./workspace-routing.module";

@NgModule({
  declarations: [HeaderComponent, TemplateComponent],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
})
export class WorkspaceModule {}
