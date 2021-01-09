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
      image:
        "https://img.favpng.com/18/17/18/popcorn-cinema-film-reel-clip-art-png-favpng-rnbc7vFwt5fwwFAaX0bYTibhq.jpg",
    },
    {
      name: "Carrousel module",
      link: "carrousel",
      image:
        "https://www.textbroker.fr/wp-content/uploads/sites/4/2018/12/picture_297648-750x447.jpg",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
