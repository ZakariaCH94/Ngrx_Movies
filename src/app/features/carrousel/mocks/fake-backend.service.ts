import { Injectable } from "@angular/core";
import { Profile, Slide } from "../models";

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
let profilesStorage = JSON.parse(sessionStorage.getItem("profiles")) || [];
let slidesStorage = JSON.parse(sessionStorage.getItem("slides")) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {
    let profiles: Profile[] = [
      {
        id: 1,
        name: "Age - inférieur à 45 ans",
        idSlides: "1,2,3",
      },
      {
        id: 2,
        name: "Age - entre à 45 et 55 ans",
        idSlides: "2,3,4",
      },
      {
        id: 3,
        name: "Age - entre 46 et 55 ans",
        idSlides: "1,4,5",
      },
      {
        id: 4,
        name: "Age - entre 56 et 70 ans",
        idSlides: "2,4",
      },
      {
        id: 5,
        name: "Age - supérieur à 70 ans",
        idSlides: "5",
      },
    ];
    let slides: Slide[] = [
      {
        id: 1,
        title: "Pourquoi faut-il souscrire une assurance de prêt immobilier ?",
        text:
          "Avant de rentrer dans le détail du taux d’assurance d’un prêt immobilier en fonction de l’âge, revenons un peu aux bases. Peut-être ne le saviez-vous pas, mais souscrire une assurance ...",
        image:
          "https://apprendre-le-cinema.fr/wp-content/uploads/2015/05/assurance.jpg",
        link:
          "https://www.hellopret.fr/assurance-pret-immobilier/taux-d-assurance-pret-immobilier-en-fonction-de-l-age/",
        visible: true,
      },
      {
        id: 2,
        title:
          "Comment est fixé le taux moyen d’assurance prêt immobilier en fonction de l’âge ?",
        text:
          "En fin lecteur que vous êtes, il ne vous a pas échappé que la fourchette de taux par tranche d’âge est très large. Qu’est-ce qui explique un tel écart ?...",
        image:
          "https://ce2016-production.s3.eu-central-1.amazonaws.com/store/photo/original/Liste%20et%20explications%20des%20diff%C3%A9rentesassurances%20allemandes.jpg",
        link:
          "https://www.hellopret.fr/assurance-pret-immobilier/taux-d-assurance-pret-immobilier-en-fonction-de-l-age/",
        visible: true,
      },
      {
        id: 3,
        title: "Pourquoi faut-il souscrire une assurance de prêt immobilier ?",
        text:
          "Avant de rentrer dans le détail du taux d’assurance d’un prêt immobilier en fonction de l’âge, revenons un peu aux bases. Peut-être ne le saviez-vous pas, mais souscrire une assurance emprunteur n’est pas une obligation légale...",
        image:
          "https://apprendre-le-cinema.fr/wp-content/uploads/2015/05/assurance.jpg",
        link:
          "https://www.hellopret.fr/assurance-pret-immobilier/taux-d-assurance-pret-immobilier-en-fonction-de-l-age/",
        visible: true,
      },
      {
        id: 4,
        title: "Exemples de calculs du coût de l’assurance de prêt à 30 ans",
        text:
          "C’est le moment de dégainer votre calculette pour un exemple chiffré. Vous avez 30 ans, vous empruntez 220 000 € sur 20 ans. Vous obtenez un taux de 0.25 % en contrat groupe....",
        image: "https://www.assuroweb.fr/v2/images/banner1.png",
        link:
          "https://www.hellopret.fr/assurance-pret-immobilier/taux-d-assurance-pret-immobilier-en-fonction-de-l-age/",
        visible: true,
      },
      {
        id: 5,
        title: "Existe-t-il un âge limite pour assurer son prêt immobilier ?",
        text:
          "La question est légitime ! La réponse théorique est non, il n’existe pas d’âge limite pour s’assurer. Tout comme en théorie, il n’existe pas non plus d’âge au-delà duquel vous ne pouvez plus emprunter....",
        image: "https://www.assuroweb.fr/v2/images/banner1.png",
        link:
          "https://www.meilleurtaux.com/images/ade/guide-assurance-emprunteur/surprime-assurance-pret-immobilier.jpg",
        visible: false,
      },
    ];
    sessionStorage.setItem("profiles", JSON.stringify(profiles));
    sessionStorage.setItem("slides", JSON.stringify(slides));
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
        case url.endsWith("/profiles") && method === "GET":
          return getProfiles();
        case url.endsWith("/slides") && method === "GET":
          return getSlides();
        case url.match(/\/profile\/\d+$/) && method === "PUT":
          return updateProfileAfterDragSlides();
        /*         case url.endsWith("/movie") && method === "POST":
          return saveMovie();
        case url.match(/\/movie\/\d+$/) && method === "PUT":
          return updateMovie();
        case url.match(/\/movie\/\d+$/) && method === "DELETE":
          return deleteMovie();
        case url.match(/\/movie\/\d+$/) && method === "POST":
          return addMovieToMyCollection(); */

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getProfiles() {
      console.log([...profilesStorage]);
      return ok(profilesStorage);
    }

    function getSlides() {
      return ok(slidesStorage);
    }

    function updateProfileAfterDragSlides() {
      const profileUpdated: Profile = body;
      profilesStorage = profilesStorage.filter(
        (profile: Profile) => profile.id !== idFromUrl()
      );
      profilesStorage.push(profileUpdated);
      sessionStorage.setItem("profiles", JSON.stringify(profilesStorage));
      return ok("profile  " + profileUpdated.name + "  successfully updated");
    }

    /* function saveMovie() {
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
    } */

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
