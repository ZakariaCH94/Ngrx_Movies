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
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Output() goToMovies = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
