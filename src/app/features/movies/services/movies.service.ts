import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Movie, Category } from "../models";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private readonly movies: Movie[];
  private readonly categories: Category[];
  private readonly delayTime = 1000;

  constructor() {
    this.movies = [
      {
        id: 1,
        categoryId: 1,
        language: "Japanese",
        length: 107,
        RecordedYear: 2016,
        title: "君の名は",
        picto: "kimi.jpg",
        specialMention: {
          firstName: "makoto",
          lastName: "shinkai",
        },
      },
      {
        id: 4,
        categoryId: 1,
        language: "Japanese",
        length: 130,
        RecordedYear: 2017,
        title: "打ち上げ花火",
        picto: "uchiage.jpg",
        specialMention: {
          firstName: "Nobuyuki",
          lastName: "Takeuchi",
        },
      },
      {
        id: 5,
        categoryId: 1,
        language: "Japanese",
        length: 130,
        RecordedYear: 2011,
        title: "あの花",
        picto: "ano.jpg",
        specialMention: {
          firstName: "Tatsuyuki",
          lastName: "Nagai",
        },
      },
      {
        id: 6,
        categoryId: 1,
        language: "Japanese",
        length: 130,
        RecordedYear: 2010,
        title: "エンジェルビーツ",
        picto: "angel.jpg",
        specialMention: {
          firstName: "Hiro",
          lastName: "Maruyama",
        },
      },
      {
        id: 2,
        categoryId: 2,
        language: "English",
        length: 92,
        RecordedYear: 1992,
        title: "Wayne's world",
        picto: "wayne.jpg",
        specialMention: {
          firstName: "Mike",
          lastName: "Myers",
        },
      },
      {
        id: 7,
        categoryId: 2,
        language: "English",
        length: 92,
        RecordedYear: 1996,
        title: "Beavis & Butt-head do America",
        picto: "beavis.jpg",
        specialMention: {
          firstName: "Mike",
          lastName: "Judge",
        },
      },
      {
        id: 8,
        categoryId: 2,
        language: "English",
        length: 92,
        RecordedYear: 1999,
        title: "Human traffic",
        picto: "human.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Simm",
        },
      },
      {
        id: 9,
        categoryId: 2,
        language: "English",
        length: 92,
        RecordedYear: 2012,
        title: "Ted",
        picto: "ted.jpg",
        specialMention: {
          firstName: "Seth",
          lastName: "MacFarlane",
        },
      },
      {
        id: 13,
        categoryId: 2,
        language: "English",
        length: 92,
        RecordedYear: 2004,
        title: "Harold & Kumar",
        picto: "harold.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Cho",
        },
      },
      {
        id: 10,
        categoryId: 2,
        language: "English",
        length: 92,
        RecordedYear: 1998,
        title: "The big lebowski",
        picto: "big.jpg",
        specialMention: {
          firstName: "Steve",
          lastName: "Buscemi",
        },
      },
      {
        id: 3,
        categoryId: 3,
        language: "English",
        length: 107,
        RecordedYear: 2014,
        title: "Whiplash",
        picto: "whiplash.jpg",
        specialMention: {
          firstName: "J.K.",
          lastName: "Simmons",
        },
      },
      {
        id: 11,
        categoryId: 3,
        language: "English",
        length: 107,
        RecordedYear: 2000,
        title: "The Filth And The Fury",
        picto: "filth.jpg",
        specialMention: {
          firstName: "John",
          lastName: "Lydon",
        },
      },
      {
        id: 12,
        categoryId: 3,
        language: "English",
        length: 107,
        RecordedYear: 1980,
        title: "The blues brothers",
        picto: "blues.jpg",
        specialMention: {
          firstName: "Dan",
          lastName: "Aykroyd",
        },
      },
    ];

    this.categories = [
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
  }

  getMoviesByCategoryId(categoryId: number): Observable<Movie[]> {
    console.log(categoryId);
    return of(
      this.movies.reduce((data, movie) => {
        if (movie.categoryId == categoryId) {
          data.push(movie);
        }
        return data;
      }, [])
    ).pipe(delay(this.delayTime));
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories).pipe(delay(this.delayTime));
  }
}
