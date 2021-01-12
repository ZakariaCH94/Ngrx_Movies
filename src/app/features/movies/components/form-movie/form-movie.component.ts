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
  selector: "app-form-movie",
  templateUrl: "./form-movie.component.html",
  styleUrls: ["./form-movie.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMovieComponent implements OnInit, OnChanges {
  submitted: boolean = false;
  @Input() action: string = "";
  @Input() optionsCategories: Category[];
  @Input() loadingAddMovie: boolean = false;
  @Output() addMovie = new EventEmitter();
  @Input() movie: Movie;
  title: string = null;
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
    "Japanese",
  ];
  labelYear: string = "Year";
  optionsYear: number[] = [2015, 2016, 2017, 2018, 2019, 2020, 2021];
  labelCategory: string = "Category";
  barButtonOptions: MatProgressButtonOptions = {
    active: this.loadingAddMovie,
    text: this.action,
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
    this.barButtonOptions.text = this.action;
    if (this.submitted == true) {
      if (this.action == "add movie") {
        this.barButtonOptions.text = "Saving movie ...";
      } else {
        this.barButtonOptions.text = "Updating movie ...";
      }
    }
    if (this.loadingAddMovie == false) {
      this.barButtonOptions.text = this.action;
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.registerMovieForm = this.formBuilder.group({
      title: [
        this.movie.title,
        [Validators.required, Validators.maxLength(22)],
      ],
      language: [this.movie.language, Validators.required],
      recordedYear: [this.movie.recordedYear, Validators.required],
      category: [this.movie.categoryId, Validators.required],
      image: [this.movie.image, Validators.required],
      heroLastName: [this.movie.specialMention.lastName, Validators.required],
      heroFirstName: [this.movie.specialMention.firstName, Validators.required],
      description: [
        this.movie.description,
        [Validators.required, Validators.maxLength(300)],
      ],
    });
  }
  get f() {
    return this.registerMovieForm.controls;
  }
  onSubmit() {
    this.movieForm = {
      id: this.movie.id,
      categoryId: this.registerMovieForm.value["category"],
      title: this.registerMovieForm.value["title"],
      language: this.registerMovieForm.value["language"],
      recordedYear: this.registerMovieForm.value["recordedYear"],
      image: this.registerMovieForm.value["image"],
      specialMention: {
        lastName: this.registerMovieForm.value["heroLastName"],
        firstName: this.registerMovieForm.value["heroFirstName"],
      },
      description: this.registerMovieForm.value["description"],
      selected: this.movie.selected,
    };
    if (this.registerMovieForm.valid) {
      this.submitted = true;
    }
    this.addMovie.emit(this.movieForm);
  }
}
