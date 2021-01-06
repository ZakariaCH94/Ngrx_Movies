import { Injectable } from "@angular/core";
import { Movie, Category } from "../models";

import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

// array in local storage for registered users
let categoriesStorage = JSON.parse(sessionStorage.getItem("categories")) || [];
let moviesStorage = JSON.parse(sessionStorage.getItem("movies")) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {
    let movies: Movie[] = [
      {
        id: 1,
        categoryId: 1,
        language: "Japanese",
        recordedYear: 2016,
        title: "君の名は",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "makoto",
          lastName: "shinkai",
        },
        description:
          "説明：「映画、または映画は、動画や音声を使用して物語を語ったり、人々に何かを教えたりする一種の視覚的コミュニケーションです。ほとんどの人は、一種の娯楽または楽しみの方法として映画を見る（見る）」、",
        selected: false,
      },

      {
        id: 4,
        categoryId: 1,
        language: "Japanese",
        recordedYear: 2017,
        title: "打ち上げ花火",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "Nobuyuki",
          lastName: "Takeuchi",
        },
        description:
          "説明：「映画、または映画は、動画や音声を使用して物語を語ったり、人々に何かを教えたりする一種の視覚的コミュニケーションです。ほとんどの人は、一種の娯楽または楽しみの方法として映画を見る（見る）」、",
        selected: false,
      },
      {
        id: 5,
        categoryId: 1,
        language: "Japanese",
        recordedYear: 2018,
        title: "あの花",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "Tatsuyuki",
          lastName: "Nagai",
        },
        description:
          "説明：「映画、または映画は、動画や音声を使用して物語を語ったり、人々に何かを教えたりする一種の視覚的コミュニケーションです。ほとんどの人は、一種の娯楽または楽しみの方法として映画を見る（見る）」、",
        selected: false,
      },
      {
        id: 6,
        categoryId: 1,
        language: "Japanese",
        recordedYear: 2019,
        title: "エンジェルビーツ",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "Hiro",
          lastName: "Maruyama",
        },
        description:
          "説明：「映画、または映画は、動画や音声を使用して物語を語ったり、人々に何かを教えたりする一種の視覚的コミュニケーションです。ほとんどの人は、一種の娯楽または楽しみの方法として映画を見る（見る）」、",
        selected: true,
      },
      {
        id: 2,
        categoryId: 2,
        language: "English",
        recordedYear: 2017,
        title: "Wayne's world",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Mike",
          lastName: "Myers",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: false,
      },
      {
        id: 7,
        categoryId: 2,
        language: "English",
        recordedYear: 2019,
        title: "Beavis & Butt-head do America",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Mike",
          lastName: "Judge",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: true,
      },
      {
        id: 8,
        categoryId: 2,
        language: "English",
        recordedYear: 2020,
        title: "Human traffic",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Simm",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: false,
      },
      {
        id: 9,
        categoryId: 2,
        language: "English",
        recordedYear: 2019,
        title: "Ted",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Seth",
          lastName: "MacFarlane",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: false,
      },
      {
        id: 13,
        categoryId: 2,
        language: "English",
        recordedYear: 2016,
        title: "Harold & Kumar",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Cho",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: true,
      },
      {
        id: 10,
        categoryId: 2,
        language: "English",
        recordedYear: 2020,
        title: "The big lebowski",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Steve",
          lastName: "Buscemi",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: false,
      },
      {
        id: 3,
        categoryId: 3,
        language: "English",
        recordedYear: 2018,
        title: "Whiplash",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "J.K.",
          lastName: "Simmons",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: false,
      },
      {
        id: 11,
        categoryId: 3,
        language: "English",
        recordedYear: 2019,
        title: "The Filth And The Fury",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Lydon",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: false,
      },
      {
        id: 12,
        categoryId: 3,
        language: "English",
        recordedYear: 2020,
        title: "The blues brothers",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Dan",
          lastName: "Aykroyd",
        },
        description:
          "Movies, or films, are a type of visual communication which uses moving pictures and sound to tell stories or teach people something. Most people watch (view) movies as a type of entertainment or a way to have fun",
        selected: false,
      },
    ];

    let categories: Category[] = [
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
      {
        id: 3,
        title: "Music themed",
        emoji: "🎵🎵🎵🎵",
        emojiStyle: "emoji-rotate",
      },
      {
        id: 4,
        title: "Father’s Day",
        emoji: "👨👨👨👨",
        emojiStyle: "emoji-swell",
      },
    ];
    sessionStorage.setItem("categories", JSON.stringify(categories));
    sessionStorage.setItem("movies", JSON.stringify(movies));
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(1500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/categories") && method === "GET":
          return getCategories();
        case url.endsWith("/movies") && method === "GET":
          return getMovies();
        case url.endsWith("/movie") && method === "POST":
          return saveMovie();
        case url.match(/\/movie\/\d+$/) && method === "PUT":
          return updateMovie();
        case url.match(/\/movie\/\d+$/) && method === "DELETE":
          return deleteMovie();
        case url.match(/\/movie\/\d+$/) && method === "POST":
          return addMovieToMyCollection();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getCategories() {
      return ok(categoriesStorage);
    }

    function getMovies() {
      return ok(moviesStorage);
    }

    function saveMovie() {
      console.log(body);
      const movieSaved: Movie = {
        id: Math.floor(Math.random() * 1000),
        categoryId: body.categoryId,
        title: body.title,
        language: body.language,
        recordedYear: body.recordedYear,
        image: body.image,
        specialMention: {
          lastName: body.specialMention.lastName,
          firstName: body.specialMention.firstName,
        },
        description: body.description,
        selected: body.selected,
      };

      if (
        moviesStorage.find((movie: Movie) => movie.title === movieSaved.title)
      ) {
        return error("movie  " + movieSaved.title + "  is already taken");
      }
      moviesStorage = [...moviesStorage];
      moviesStorage.push(movieSaved);
      sessionStorage.setItem("movies", JSON.stringify(moviesStorage));

      return ok(movieSaved);
    }

    function updateMovie() {
      const movieSaved = body;
      moviesStorage = moviesStorage.filter(
        (movie: Movie) => movie.id !== idFromUrl()
      );
      moviesStorage.push(movieSaved);
      sessionStorage.setItem("movies", JSON.stringify(moviesStorage));
      return ok("movie  " + movieSaved.title + "  successfully updated");
    }
    function addMovieToMyCollection() {
      let currentMovie: Movie = moviesStorage.find(
        (movie: Movie) => movie.id == idFromUrl()
      );

      moviesStorage = moviesStorage.filter(
        (movie: Movie) => movie.id !== currentMovie.id
      );

      const currentMovieObject = Object.assign({}, currentMovie);

      currentMovieObject.selected = !currentMovieObject.selected;
      moviesStorage.push(currentMovieObject);
      sessionStorage.setItem("movies", JSON.stringify(moviesStorage));

      if (currentMovieObject.selected == true) {
        return ok(
          "movie  " +
            currentMovieObject.title +
            "  successfully added to collection"
        );
      } else
        return ok(
          "movie  " +
            currentMovieObject.title +
            "  successfully remove to collection"
        );
    }

    function deleteMovie() {
      moviesStorage = moviesStorage.filter(
        (movie: Movie) => movie.id !== idFromUrl()
      );
      sessionStorage.setItem("movies", JSON.stringify(moviesStorage));
      return ok("movie successfully deleted");
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function serverError() {
      return throwError({
        status: 500,
        error: { message: "An error occured" },
      });
    }

    function error(message) {
      console.log(error);
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
