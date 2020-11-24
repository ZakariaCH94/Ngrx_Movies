import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "../models";
@Pipe({
  name: "titleMoviesFilter",
})
export class TitleMoviesFilterPipe implements PipeTransform {
  transform(movies: Movie[], searchValue: string): unknown {
    if (!searchValue) return movies;
    /**
     * filtrer les movies par titres
     */
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
