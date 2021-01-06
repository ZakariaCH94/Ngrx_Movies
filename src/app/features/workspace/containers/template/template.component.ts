import { Component, OnInit } from "@angular/core";

export interface Panel {
  name: string;
  link: string;
  image: string;
}
@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.css"],
})
export class TemplateComponent implements OnInit {
  panels: Panel[] = [
    {
      name: "Movies module",
      link: "movies",
      image: "https://upload.wikimedia.org/wikipedia/en/b/b4/At-the-movies.jpg",
    },
    {
      name: "Movies -- component store",
      link: "movies",
      image: "https://upload.wikimedia.org/wikipedia/en/b/b4/At-the-movies.jpg",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
