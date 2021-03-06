import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-select-tab-object",
  templateUrl: "./select-tab-object.component.html",
  styleUrls: ["./select-tab-object.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTabObjectComponent implements OnInit {
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
