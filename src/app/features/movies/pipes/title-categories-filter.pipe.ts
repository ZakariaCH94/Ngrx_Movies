import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "../models";
import { categoriesReducer } from "../store/reducers";
@Pipe({
  name: "titleCategoriesFilter",
})
export class TitleCategoriesFilterPipe implements PipeTransform {
  categories: Category[] = [];
  transform(categories: Category[], searchValue: string): Category[] {
    if (!searchValue) return categories;
    /**
     * filtrer les categories par titres
     */
    this.categories = categories.filter(
      (category) =>
        category.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
    return this.categories;
  }
}
