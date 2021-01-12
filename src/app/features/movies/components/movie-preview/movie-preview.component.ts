import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Movie } from "../../models";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-movie-preview",
  templateUrl: "./movie-preview.component.html",
  styleUrls: ["./movie-preview.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviePreviewComponent implements OnInit {
  @Input() movie: Movie;
  @Input() parent: string;

  @Output() updateMovie = new EventEmitter<number>();
  @Output() deleteMovie = new EventEmitter<number>();
  @Output() detailsMovie = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  delete(MovieId: number) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: "Are you sure want to delete?",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result == true) {
          this.deleteMovie.emit(MovieId);
        }
      });
  }
}
