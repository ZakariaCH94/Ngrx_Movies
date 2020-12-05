import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category, Movie } from "../../models";
import { MatProgressButtonOptions } from "mat-progress-buttons";

@Component({
  selector: "app-form-add-movie",
  templateUrl: "./form-add-movie.component.html",
  styleUrls: ["./form-add-movie.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddMovieComponent implements OnInit, OnChanges {
  @Input() optionsCategories: Category[];
  @Input() loadingAddMovie: boolean = false;
  @Output() addMovie = new EventEmitter();

  movieForm: Movie;
  registerMovieForm: FormGroup;
  titleAlert: string = "This field is required";
  labelLanguage: string = "Language";
  optionsLanguage: string[] = [
    "French",
    "English",
    "Arabic",
    "Russe",
    "Spanish",
  ];
  labelYear: string = "Year";
  optionsYear: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
  labelCategory: string = "Category";
  barButtonOptions: MatProgressButtonOptions = {
    active: this.loadingAddMovie,
    text: "add movie",
    buttonColor: "primary",
    barColor: "primary",
    raised: true,
    stroked: false,
    mode: "indeterminate",
    value: 0,
    disabled: false,
    fullWidth: false,
    buttonIcon: {
      fontIcon: "save",
    },
  };

  constructor(private formBuilder: FormBuilder) {}
  ngOnChanges() {
    this.barButtonOptions.active = this.loadingAddMovie;
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.registerMovieForm = this.formBuilder.group({
      title: [null, Validators.required],
      language: [null, Validators.required],
      recordedYear: [null, Validators.required],
      category: [null, Validators.required],
      image: [null, Validators.required],
      heroLastName: [null, Validators.required],
      heroFirstName: [null, Validators.required],
    });
  }
  get f() {
    return this.registerMovieForm.controls;
  }
  onSubmit() {
    this.movieForm = {
      id: Math.floor(Math.random() * 1000),
      categoryId: this.registerMovieForm.value["category"],
      title: this.registerMovieForm.value["title"],
      language: this.registerMovieForm.value["language"],
      recordedYear: this.registerMovieForm.value["recordedYear"],
      image: this.registerMovieForm.value["image"],
      specialMention: {
        lastName: this.registerMovieForm.value["heroLastName"],
        firstName: this.registerMovieForm.value["heroFirstName"],
      },
    };

    this.addMovie.emit({ movie: this.movieForm });
  }
}
