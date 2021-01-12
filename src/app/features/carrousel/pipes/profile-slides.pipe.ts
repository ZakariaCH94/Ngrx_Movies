import { Pipe, PipeTransform } from "@angular/core";
import { Slide, Profile } from "../models";
import { Store } from "@ngrx/store";
import * as actions from "../store/actions";
import { ElementsState } from "../store/reducers";
@Pipe({
  name: "profileSlides",
})
export class ProfileSlidesPipe implements PipeTransform {
  constructor() {}

  transform(
    slides: Slide[],
    profiles: Profile[],
    idProfile: number,
    InitSlides: Slide[]
  ): Slide[] {
    if (idProfile == undefined) return slides;
    else {
      const profile = profiles.find((profile) => profile.id === idProfile);
      return this.getSlidesByIdProfile(profile, InitSlides);
    }
  }

  getSlidesByIdProfile(profile: Profile, slides: Slide[]): Slide[] {
    let slidesAfterFilerByidProfile: Slide[] = [];
    let idSlidesByProfile: number[];
    idSlidesByProfile = profile.idSlides.split(",").map((str) => parseInt(str));

    idSlidesByProfile.filter((idSlide) => {
      const slideSelected = slides.find((slide) => slide.id === idSlide);
      if (slideSelected) slidesAfterFilerByidProfile.push(slideSelected);
    });

    return slidesAfterFilerByidProfile;
  }
}
