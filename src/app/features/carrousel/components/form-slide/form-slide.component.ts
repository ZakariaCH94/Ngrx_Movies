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
import { Profile, Slide } from "../../models";
import { MatProgressButtonOptions } from "mat-progress-buttons";
@Component({
  selector: "app-form-slide",
  templateUrl: "./form-slide.component.html",
  styleUrls: ["./form-slide.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSlideComponent implements OnInit, OnChanges {
  submitted: boolean = false;
  etatSlide: String = "slide disabled";

  @Input() action: string = "";
  @Input() profiles: Profile[];
  @Input() profilesSelected: Profile[];
  @Input() loadingAddSlide: boolean = false;
  @Output() addSlide = new EventEmitter();
  @Input() slide: Slide;
  title: string = null;
  slideForm: Slide;
  profilesSelectedForm: Profile[];
  registerSlideForm: FormGroup;
  barButtonOptions: MatProgressButtonOptions = {
    active: this.loadingAddSlide,
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
  titleAlert: string = "This field is required";

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  ngOnChanges() {
    this.barButtonOptions.active = this.loadingAddSlide;
    this.barButtonOptions.text = this.action;
    if (this.submitted == true) {
      if (this.action == "add slide") {
        this.barButtonOptions.text = "Saving slide ...";
      } else {
        this.barButtonOptions.text = "Updating slide ...";
      }
    }
    if (this.loadingAddSlide == false) {
      this.barButtonOptions.text = this.action;
    }
  }
  createForm() {
    this.registerSlideForm = this.formBuilder.group({
      title: [
        this.slide.title,
        [Validators.required, Validators.maxLength(100)],
      ],
      text: [this.slide.text, [Validators.required, Validators.maxLength(300)]],
      profiles: [null, Validators.required],
      image: [this.slide.image, Validators.required],
      link: [this.slide.link, Validators.required],
      visible: [this.slide.visible],
    });
  }
  get f() {
    return this.registerSlideForm.controls;
  }

  OnOf() {
    if (this.registerSlideForm.value["visible"] == false) {
      this.etatSlide = "slide disabled";
    }
    if (this.registerSlideForm.value["visible"] == true) {
      this.etatSlide = "slide activated";
    }
  }

  onSubmit() {
    this.slideForm = {
      id: this.slide.id,
      title: this.registerSlideForm.value["title"],
      text: this.registerSlideForm.value["text"],
      image: this.registerSlideForm.value["image"],
      link: this.registerSlideForm.value["link"],
      visible: this.registerSlideForm.value["visible"],
    };

    this.profilesSelectedForm = this.registerSlideForm.value["profiles"];
    this.addSlide.emit({
      slide: this.slideForm,
      profiles: this.profilesSelectedForm,
    });
  }
}
