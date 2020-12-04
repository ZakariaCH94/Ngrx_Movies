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
let users = JSON.parse(sessionStorage.getItem("users")) || [];
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
        RecordedYear: 2016,
        title: "君の名は",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "makoto",
          lastName: "shinkai",
        },
      },
      {
        id: 4,
        categoryId: 1,
        language: "Japanese",
        RecordedYear: 2017,
        title: "打ち上げ花火",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "Nobuyuki",
          lastName: "Takeuchi",
        },
      },
      {
        id: 5,
        categoryId: 1,
        language: "Japanese",
        RecordedYear: 2011,
        title: "あの花",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "Tatsuyuki",
          lastName: "Nagai",
        },
      },
      {
        id: 6,
        categoryId: 1,
        language: "Japanese",
        RecordedYear: 2010,
        title: "エンジェルビーツ",
        image: "https://www.flagsonline.fr/uploads/2016-6-6/420-272/japan.jpg",
        specialMention: {
          firstName: "Hiro",
          lastName: "Maruyama",
        },
      },
      {
        id: 2,
        categoryId: 2,
        language: "English",
        RecordedYear: 1992,
        title: "Wayne's world",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Mike",
          lastName: "Myers",
        },
      },
      {
        id: 7,
        categoryId: 2,
        language: "English",
        RecordedYear: 1996,
        title: "Beavis & Butt-head do America",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Mike",
          lastName: "Judge",
        },
      },
      {
        id: 8,
        categoryId: 2,
        language: "English",
        RecordedYear: 1999,
        title: "Human traffic",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Simm",
        },
      },
      {
        id: 9,
        categoryId: 2,
        language: "English",
        RecordedYear: 2012,
        title: "Ted",
        image: "ted.jpg",
        specialMention: {
          firstName: "Seth",
          lastName: "MacFarlane",
        },
      },
      {
        id: 13,
        categoryId: 2,
        language: "English",
        RecordedYear: 2004,
        title: "Harold & Kumar",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Cho",
        },
      },
      {
        id: 10,
        categoryId: 2,
        language: "English",
        RecordedYear: 1998,
        title: "The big lebowski",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Steve",
          lastName: "Buscemi",
        },
      },
      {
        id: 3,
        categoryId: 3,
        language: "English",
        RecordedYear: 2014,
        title: "Whiplash",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "J.K.",
          lastName: "Simmons",
        },
      },
      {
        id: 11,
        categoryId: 3,
        language: "English",
        RecordedYear: 2000,
        title: "The Filth And The Fury",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Lydon",
        },
      },
      {
        id: 12,
        categoryId: 3,
        language: "English",
        RecordedYear: 1980,
        title: "The blues brothers",
        image: "https://i.ebayimg.com/images/g/LmIAAOSw3YNXYwX-/s-l300.jpg",
        specialMention: {
          firstName: "Dan",
          lastName: "Aykroyd",
        },
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
    /*  sessionStorage.setItem("categories", JSON.stringify(categories));
    sessionStorage.setItem("movies", JSON.stringify(movies)); */
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
        case url.endsWith("/movie") && method === "POST":
          return saveMovie();
        case url.endsWith("/categories") && method === "GET":
          return getCategories();
        case url.endsWith("/movies") && method === "GET":
          return getMovies();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function saveMovie() {
      const movieSaved = body;
      if (
        moviesStorage.find((movie: Movie) => movie.title === movieSaved.title)
      ) {
        return error('movie "' + movieSaved.title + '" is already taken');
      }
      moviesStorage.push(movieSaved);
      sessionStorage.setItem("movies", JSON.stringify(moviesStorage));
    }

    function getCategories() {
      return ok(categoriesStorage);
    }
    function getMovies() {
      return ok(moviesStorage);
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
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
