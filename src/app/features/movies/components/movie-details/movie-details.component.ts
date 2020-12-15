import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
} from "@angular/core";
import { MatProgressButtonOptions } from "mat-progress-buttons";

import { Movie } from "../../models";
@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"],
})
export class MovieDetailsComponent implements OnInit, OnChanges {
  @Input() movie: Movie;
  @Output() addOrDeleteToMyCollection = new EventEmitter();
  @Input() loadingAddOrDeleteMovieToMycollection: boolean = false;

  barButtonOptions: MatProgressButtonOptions = {
    active: this.loadingAddOrDeleteMovieToMycollection,
    text: "",
    buttonColor: "primary",
    barColor: "primary",
    raised: true,
    stroked: false,
    mode: "indeterminate",
    value: 0,
    disabled: false,
    fullWidth: false,
    buttonIcon: {
      fontIcon: "",
    },
  };
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.movie.selected == true) {
      this.barButtonOptions.text = "Remove movie to collection";
      this.barButtonOptions.buttonColor = "accent";
      this.barButtonOptions.barColor = "accent";
      this.barButtonOptions.buttonIcon.fontIcon = "remove_from_queue";
    } else {
      this.barButtonOptions.text = "Add movie to collection";
      this.barButtonOptions.buttonIcon.fontIcon = "playlist_add";
      this.barButtonOptions.buttonColor = "primary";
      this.barButtonOptions.barColor = "primary";
    }
    this.barButtonOptions.active = this.loadingAddOrDeleteMovieToMycollection;
  }
}
