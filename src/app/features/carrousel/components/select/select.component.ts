import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Profile } from "../../models";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.css"],
})
export class SelectComponent implements OnInit {
  @Input() profiles: Profile[];
  @Input() profileSelected: Profile;

  @Output() selectedSlidesByProfile = new EventEmitter<number>();
  selected: FormControl;
  constructor() {}

  ngOnInit(): void {
    this.selected = new FormControl(this.profileSelected, [
      Validators.required,
    ]);
  }
}
