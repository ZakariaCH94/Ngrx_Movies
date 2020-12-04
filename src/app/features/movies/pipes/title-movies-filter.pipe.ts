import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "../models";
@Pipe({
  name: "titleMoviesFilter",
})
export class TitleMoviesFilterPipe implements PipeTransform {
  movies: Movie[] = [];
  transform(movies: Movie[], searchValue: string): Movie[] {
    if (!searchValue) return movies;
    /**
     * filtrer les movies par titres
     */
    this.movies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
    return this.movies;
  }
}
