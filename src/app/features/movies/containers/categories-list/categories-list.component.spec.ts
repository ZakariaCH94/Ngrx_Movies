/* import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoriesListComponent } from "./categories-list.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Category } from "../../models";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { TitleCategoriesFilterPipe } from "../../pipes";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { reducers } from "../../store/reducers";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { effects } from "../../store/effects";

describe("CategoriesListComponent", () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  let categories: Category[] = [];

  function getTitleCategoryList() {
    const CategoryListElement = fixture.debugElement.queryAll(
      By.css("app-category-preview")
    );

    console.log(CategoryListElement);

    return CategoryListElement.map(
      (category) => category.properties.category.title
    );
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesListComponent, TitleCategoriesFilterPipe],
      imports: [
        MatProgressSpinnerModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("elements", reducers),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    categories = [
      {
        id: 1,
        title: " Japanese anime",
        emoji: "👨‍👩‍👧‍👦",
        emojiStyle: "emoji-simple-swell",
      },
      {
        id: 2,
        title: "Crazy movies",
        emoji: "🐱‍🐉🐱‍🐉",
        emojiStyle: "emoji-swell",
      },
    ];
  });

  it("should display categories", () => {
    component.categories$ = of(categories);

    fixture.detectChanges();
    const titleCategoryList: string[] = getTitleCategoryList();

    expect(titleCategoryList).toEqual(["Japanese anime", "Crazy movies"]);
  });
});
 */
