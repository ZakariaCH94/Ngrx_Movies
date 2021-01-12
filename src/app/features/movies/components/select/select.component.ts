import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Input() label: string;
  @Input() options: any[];
  @Input() valid: boolean;
  @Input() touched: boolean;
  @Input() registerForm: FormGroup;
  @Input() control: string;
  @Input() titleAlert: string;
  constructor() {}

  ngOnInit(): void {}
}
