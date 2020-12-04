import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../models";

@Component({
  selector: "app-form-add-movie",
  templateUrl: "./form-add-movie.component.html",
  styleUrls: ["./form-add-movie.component.css"],
})
export class FormAddMovieComponent implements OnInit {
  registerMovieForm: FormGroup;
  titleAlert: string = "This field is required";

  labelLanguage: string = "Language";
  optionsLanguage: string[] = ["French", "English", "Arabic"];
  labelYear: string = "Year";
  optionsYear: number[] = [2019, 2020, 2021];
  labelCategory: string = "Category";
  @Input() optionsCategories: Category[];

  constructor(private formBuilder: FormBuilder) {}

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
  onSubmit() {}
}
