import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-book-search",
  templateUrl: "./book-search.component.html",
  styleUrls: ["./book-search.component.css"],
})
export class BookSearchComponent implements OnInit {
  searching: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  search (x) {
    console.log(x)
  }
}
