export interface IMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface IResults {
  Response: string;
  totalResults: number;
  Search: [IMovie];
}
