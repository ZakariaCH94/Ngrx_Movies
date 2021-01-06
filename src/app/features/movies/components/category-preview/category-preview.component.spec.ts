import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryPreviewComponent } from "./category-preview.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Category } from "../../models";
import { By } from "@angular/platform-browser";

describe("CategoryPreviewComponent", () => {
  let component: CategoryPreviewComponent;
  let fixture: ComponentFixture<CategoryPreviewComponent>;

  let category: Category;

  function getTitleCategory() {
    return fixture.debugElement.query(By.css('[data-role="category-title"]'))
      .nativeElement.textContent;
  }
  function getEmojiCategory() {
    return fixture.debugElement.query(By.css('[data-role="category-emoji"]'))
      .nativeElement.textContent;
  }
  function getEmojiStyleCategory() {
    return fixture.debugElement.query(
      By.css('[data-role="category-emojiStyle"]')
    ).nativeElement.textContent;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPreviewComponent],
      imports: [MatCardModule, MatButtonModule],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPreviewComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    category = {
      id: 1,
      title: "Japanese anime",
      emoji: "👨‍👩‍👧‍👦",
      emojiStyle: "emoji-simple-swell",
    };
  });

  it("should display category", () => {
    component.category = category;
    fixture.detectChanges();
    const titleCategory: string = getTitleCategory();
    const emojiCategory: string = getEmojiCategory();
    const emojiStyleCategory: string = getEmojiStyleCategory();
    expect(titleCategory).toEqual("Japanese anime");
    expect(emojiCategory).toEqual("👨‍👩‍👧‍👦");
    expect(emojiStyleCategory).toContain("emoji-simple-swell");
  });
});
