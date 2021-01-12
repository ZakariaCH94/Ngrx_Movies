import { TitleMoviesFilterPipe } from "./title-movies-filter.pipe";
import { Movie } from "../models";

let movies: Movie[];

describe("TitleCasePipe", () => {
  const pipe = new TitleMoviesFilterPipe();

  beforeEach(() => {
    movies = [
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
  });

  it("search movies based on their title ", () => {
    expect(pipe.transform(movies, "Wayne").length).toEqual(1);
  });
});
