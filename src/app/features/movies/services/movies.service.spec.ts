//units tests service movies
import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MoviesService } from "./movies.service";
import { Movie } from "../models";
import { StoreModule } from "@ngrx/store";

describe("Service: MoviesService", () => {
  let injector: TestBed;
  let mockMovies: Movie[];
  let mockMovie: Movie;
  let httpMock: HttpTestingController;
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [MoviesService],
    });
  });

  beforeEach(() => {
    mockMovies = [
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
    ];

    mockMovie = {
      id: undefined,
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
      selected: false,
    };
  });

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(MoviesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("getMovies: should return a movies list", () => {
    service.getMovies().subscribe((movies: Movie[]) => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });
    const req = httpMock.expectOne("http://localhost:4200:/movies");
    expect(req.request.method).toBe("GET");
    req.flush(mockMovies);
  });

  it("addMovie: should return a movies", () => {
    service.addMovie(mockMovie).subscribe((movie: Movie) => {
      console.log(movie);
      expect(movie.language).toEqual("English");
    });
    const req = httpMock.expectOne("http://localhost:4200:/movie");
    expect(req.request.method).toBe("POST");
    req.flush(mockMovie);
  });
});
