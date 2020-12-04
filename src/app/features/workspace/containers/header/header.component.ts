import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public menus = [
    /*   {
      title: "Books",
      url: "books",
      icone: "book",
    }, */
    {
      title: "Movies",
      url: "movies",
      icone: "movie",
    },
  ];
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  onMenuItem(m: any) {
    this.router.navigateByUrl(m.url);
  }

  open(menu: any) {
    menu.openMenu();
  }
}
