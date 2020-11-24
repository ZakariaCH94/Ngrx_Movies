import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "../models";
@Pipe({
  name: "titleCategoriesFilter",
})
export class TitleCategoriesFilterPipe implements PipeTransform {
  transform(categories: Category[], searchValue: string): unknown {
    if (!searchValue) return categories;
    /**
     * filtrer les categories par titres
     */
    return categories.filter(
      (category) =>
        category.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
