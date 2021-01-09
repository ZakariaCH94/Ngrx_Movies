import * as categoriesReducer from "./categories.reducer";
import * as actionsCategory from "../actions";
import { Category } from "../../models";
import { categoriesState } from "../reducers";

let initCategoriesState: categoriesState;
let category: Category;

describe("CategoriesReducer", () => {
  beforeEach(() => {
    category = {
      id: 1,
      title: " Japanese anime",
      emoji: "👨‍👩‍👧‍👦",
      emojiStyle: "emoji-simple-swell",
    };
    initCategoriesState = {
      categories: [],
      loading: true,
      error: "",
    };
  });
  describe("GET_CATEGORIES action", () => {
    it("should return the loading state ", () => {
      const stateGetCategories = categoriesReducer.categoriesReducer(
        initCategoriesState,
        actionsCategory.GET_CATEGORIES
      );
      expect(stateGetCategories.loading).toBe(true);
    });
  });

  describe("GET_CATEGORIES_SUCCESS action", () => {
    it("should return the categories state", () => {
      const GET_CATEGORIES_SUCCESS = actionsCategory.GET_CATEGORIES_SUCCESS({
        categories: [category],
      });
      const stateGetCategoriesSuccess = categoriesReducer.categoriesReducer(
        initCategoriesState,
        GET_CATEGORIES_SUCCESS
      );
      expect(stateGetCategoriesSuccess.categories[0]).toEqual(category);
    });
  });

  it("should the list categories", () => {
    const categories: Category[] = categoriesReducer.getAllCategories(
      initCategoriesState
    );
    expect(categories).toBe(initCategoriesState.categories);
  });
});
