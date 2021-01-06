import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from "@angular/core";
import { Category } from "../../models";

@Component({
  selector: "app-category-preview",
  templateUrl: "./category-preview.component.html",
  styleUrls: ["./category-preview.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPreviewComponent implements OnInit {
  @Input() category: Category;
  @Output() goToMovies = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
