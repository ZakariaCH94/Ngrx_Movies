import { Person } from "./index";

export interface Movie {
  id: number;
  categoryId: number;
  title: string;
  language: string;
  RecordedYear: number;
  image: string;
  specialMention: Person;
}
