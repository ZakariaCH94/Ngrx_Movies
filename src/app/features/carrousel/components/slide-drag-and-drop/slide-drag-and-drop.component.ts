import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Profile, Slide } from "../../models";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-slide-drag-and-drop",
  templateUrl: "./slide-drag-and-drop.component.html",
  styleUrls: ["./slide-drag-and-drop.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideDragAndDropComponent implements OnInit {
  @Input() i: number;
  @Input() slides: Slide[];
  @Input() profileSelected: Profile;
  @Input() profiles: Profile[];
  @Output() updateProfileAfterDragandDropSlides = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Slide[]>) {
    this.slides = [...this.slides];
    moveItemInArray(this.slides, event.previousIndex, event.currentIndex);
    this.updateProfileAfterDragandDropSlides.emit({
      profile: this.profileSelected,
      slides: this.slides,
    });
  }
}
