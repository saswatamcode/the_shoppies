import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../lib/useDebounce";
import { IResults, IMovie } from "../types/types";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IResults>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [nominees, setNominees] = useState<IMovie[]>([]);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);

  const colors = [
    "purple-400",
    "yellow-400",
    "red-400",
    "blue-400",
    "green-400",
  ];
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

  const handleAdd = (result: IMovie) => {
    if (nominees.length === 0) {
      setNominees([result]);
    } else if (nominees.length > 0 && nominees.length < 5) {
      if (nominees.length === 4) {
        setShowBanner(true);
      }
      setNominees((prevState: IMovie[]) => [...prevState, result]);
    }
    console.log(nominees);
  };

  const handleRemove = (result: IMovie) => {
    if (nominees.includes(result)) {
      setNominees((prevState: IMovie[]) =>
        prevState.filter((res) => result !== res)
      );
    }
    console.log(nominees);
  };

  return (
    <>
      {showBanner ? <Banner close={() => setShowBanner(false)} /> : <></>}
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-red-500 to-yellow-500 text-5xl font-black mb-10">
        The Shoppies
      </h1>

      <div className="grid grid-cols-3 gap-5 w-11/12">
        <div className="col-span-2">
          <SearchBar value={search} handleChange={handleChange} />

          <div className="grid grid-cols-2 gap-5 w-full">
            {isSearching && <h1>Loading...</h1>}
            {searchResults && searchResults.Response === "True" && (
              <>
                {searchResults.Search.map((result: IMovie) => {
                  if (nominees.includes(result)) {
                    return (
                      <MovieCard
                        result={result}
                        nominatedList={false}
                        disableBtn
                        color={
                          colors[Math.floor(Math.random() * colors.length)]
                        }
                        handler={handleAdd}
                      />
                    );
                  } else {
                    return (
                      <MovieCard
                        result={result}
                        nominatedList={false}
                        color={
                          colors[Math.floor(Math.random() * colors.length)]
                        }
                        handler={handleAdd}
                      />
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-br from-black to-gray-500 rounded-xl w-full p-5">
            <h2 className="text-white text-2xl font-black mb-10">
              Your Nominations
            </h2>

            <div className="grid grid-cols-1 gap-5 w-full">
              {nominees.length > 0 && (
                <>
                  {nominees.map((result: IMovie) => {
                    return (
                      <MovieCard
                        result={result}
                        nominatedList
                        color={
                          colors[Math.floor(Math.random() * colors.length)]
                        }
                        handler={handleRemove}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
