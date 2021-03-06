import * as selectorMovies from "./movies.selector";
import { Movie } from "../../models";
import { MyRouterStateSnapshot } from "../../../shared/router-store";
import { moviesState } from "../reducers";

let initMovies: Movie[];
let initMoviesState: moviesState;
describe("MoviesSelectors", () => {
  const initRouter: MyRouterStateSnapshot = {
    url: "/movies/movie-details/1",
    params: { movieId: "1" },
    queryParams: {},
  };
  beforeEach(() => {
    initMovies = [
      {
        id: 1,
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
    ];

    initMoviesState = {
      movies: initMovies,
      currentMovie: null,
      movieId: null,
      loadingAllMovies: false,
      loadingActionMovie: false,
      error: "",
      success: "",
    };
  });
  it("should the list movies", () => {
    const movies: Movie[] = selectorMovies.getAllMovies.projector(
      initMoviesState
    );
    expect(movies).toBe(initMoviesState.movies);
    expect(movies[0].language).toEqual("Japanese");
  });

  it("should the collection movies", () => {
    const movies: Movie[] = selectorMovies.getMyCollectionMovies.projector(
      initMovies
    );
    expect(movies.length).toEqual(1);
  });
  it("should the movies by Id", () => {
    const movie: Movie = selectorMovies.getMovieById.projector(
      initRouter,
      initMovies
    );
    expect(movie.id).toEqual(1);
  });
});
