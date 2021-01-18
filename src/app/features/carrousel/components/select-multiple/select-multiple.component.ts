import { Component, OnInit, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Profile } from "../../models";
@Component({
  selector: "app-select-multiple",
  templateUrl: "./select-multiple.component.html",
  styleUrls: ["./select-multiple.component.css"],
})
export class SelectMultipleComponent implements OnInit {
  @Input() label: string;
  @Input() profiles: Profile[];
  @Input() valid: boolean;
  @Input() touched: boolean;
  @Input() registerForm: FormGroup;
  @Input() control: string;
  @Input() titleAlert: string;
  constructor() {}

  ngOnInit(): void {}
}
