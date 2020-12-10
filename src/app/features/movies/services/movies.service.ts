import { Injectable } from "@angular/core";
import { Movie } from "../models";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get("http://localhost:4200:/categories");
  }

  getMovies() {
    return this.http.get("http://localhost:4200:/movies");
  }

  addMovie(movie: Movie) {
    return this.http.post("http://localhost:4200:/movie", movie);
  }

  updateMovie(movie: Movie) {
    return this.http.post("http://localhost:4200:/movie/" + movie.id, movie);
  }

  deleteMovie(movieId: number) {
    return this.http.delete("http://localhost:4200:/movie/" + movieId);
  }
}
