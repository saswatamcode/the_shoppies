import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../lib/useDebounce";
import { IResults, IMovie } from "../types/types";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IResults>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearch !== "") {
      setIsSearching(true);
      axios
        .get(
          `https://www.omdbapi.com/?s=${search}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => {
          setIsSearching(false);
          setSearchResults(res.data);
          console.log(res.data);
        });
    }
  }, [debouncedSearch]);

  return (
    <>
      <h1>The Shoppies</h1>
      <div>
        <label>Movie Title</label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          aria-label="Search"
        />
      </div>
      <div>
        Results:
        {isSearching && <h1>Loading...</h1>}
        {searchResults && searchResults.Response === "True" && (
          <>
            <h3>Total Results: {searchResults.totalResults}</h3>
            {searchResults.Search.map((result: IMovie) => (
              <div key={result.imdbID}>
                <p>{result.Title}</p>
                <p>{result.Type}</p>
                <p>{result.Year}</p>
                <img src={result.Poster} alt={result.Title} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
