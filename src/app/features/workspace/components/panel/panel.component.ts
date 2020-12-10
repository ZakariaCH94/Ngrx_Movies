import { Component, OnInit, Input } from "@angular/core";
import { Panel } from "../../containers";
@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.css"],
})
export class PanelComponent implements OnInit {
  @Input() panel: Panel;
  constructor() {}

  ngOnInit(): void {}
}
