import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../lib/useDebounce";
import { IResults, IMovie } from "../types/types";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import useStickyState from "../lib/useStickyState";
import ResultBar from "../components/ResultsBar";
import Loading from "../components/Loading";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IResults>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [nominees, setNominees] = useStickyState([], "nominees");
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);

  const colors = [
    "purple-400",
    "yellow-400",
    "red-400",
    "blue-400",
    "green-400",
  ];

  const fetchData = () => {
    setIsSearching(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/${search}`)
      .then((res) => {
        setIsSearching(false);
        setSearchResults(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearch !== "") {
      fetchData();
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
  };

  const handleRemove = (result: IMovie) => {
    if (nominees.includes(result)) {
      setNominees((prevState: IMovie[]) =>
        prevState.filter((res) => result !== res)
      );
    }
  };

  const isNominee = (id: string): boolean => {
    var val = false;
    nominees.map((nominee: IMovie) => {
      if (id === nominee.imdbID) {
        val = true;
      }
    });
    return val;
  };

  const clearSearch = () => {
    setSearchResults({} as IResults);
  };

  return (
    <>
      {showBanner ? <Banner close={() => setShowBanner(false)} /> : <></>}
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-red-500 to-yellow-500 text-5xl font-black mb-10">
        The Shoppies
      </h1>

      <div className="grid grid-cols-3 gap-5 w-11/12">
        <div className="col-span-2">
          <SearchBar
            value={search}
            handleChange={handleChange}
            search={fetchData}
          />
          {isSearching && <Loading />}

          <div className="grid grid-cols-2 gap-5 w-full">
            {!isSearching &&
              searchResults &&
              searchResults.Response === "True" && (
                <>
                  <ResultBar
                    totalResults={searchResults.totalResults}
                    clearSearch={clearSearch}
                  />
                  {searchResults.Search.map((result: IMovie) => {
                    return (
                      <MovieCard
                        key={result.imdbID}
                        result={result}
                        nominatedList={false}
                        disableBtn={isNominee(result.imdbID)}
                        color={
                          colors[Math.floor(Math.random() * colors.length)]
                        }
                        handler={handleAdd}
                      />
                    );
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
                        key={result.imdbID}
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
