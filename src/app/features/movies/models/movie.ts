import { Person } from "./index";

export interface Movie {
  id: number;
  categoryId: number;
  title: string;
  language: string;
  RecordedYear: number;
  length: number;
  picto: string;
  specialMention: Person;
}
