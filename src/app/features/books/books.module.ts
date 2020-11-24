import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FindBookComponent, TemplateComponent } from "./containers";
import { BooksRoutingModule } from "./books-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  BookSearchComponent,
  BookPreviewListComponent,
  BookPreviewComponent,
} from "./components";

@NgModule({
  declarations: [
    FindBookComponent,
    TemplateComponent,
    BookSearchComponent,
    BookPreviewListComponent,
    BookPreviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class BooksModule {}
