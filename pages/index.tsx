import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../lib/useDebounce";
import { IResults, IMovie } from "../types/types";
import { FaSearch, FaHeart } from "react-icons/fa";
import Image from "next/image";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IResults>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [nominees, setNominees] = useState<IMovie[]>([]);
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
    if (nominees) {
      setNominees((prevState: IMovie[]) => [...prevState, result]);
    } else {
      setNominees([result]);
    }
    console.log(nominees);
  };

  return (
    <>
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-red-500 to-yellow-500 text-5xl font-black mb-10">
        The Shoppies
      </h1>
      <div className="bg-indigo-600 rounded-lg shadow-xl p-6 w-7/12 mb-6">
        <div className="flex justify-between text-gray-600">
          <label className="text-white text-2xl font-bold pr-10">
            Movie Title
          </label>
          <div className="flex items-center bg-white h-10 pl-5 rounded-full text-sm w-8/12">
            <input
              type="text"
              name="search"
              className="w-11/12"
              value={search}
              onChange={handleChange}
              aria-label="Search"
            />
            <FaSearch />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-7/12">
        {isSearching && <h1>Loading...</h1>}
        {searchResults && searchResults.Response === "True" && (
          <>
            {searchResults.Search.map((result: IMovie) => {
              return (
                <div
                  key={result.imdbID}
                  className={`flex flex-col justify-center text-white bg-${
                    colors[Math.floor(Math.random() * colors.length)]
                  } p-5 rounded-lg shadow-xl`}
                >
                  <h4 className="text-xl font-bold">{result.Title}</h4>
                  <div className="flex justify-between w-full text-md font-semibold">
                    <p>{result.Year}</p>
                    <p>{result.Type}</p>
                  </div>
                  <br />
                  <Image
                    className="object-cover rounded-md shadow-md"
                    src={result.Poster}
                    alt={result.Title}
                    height={400}
                    width={250}
                  />
                  <br />
                  <button
                    className="flex items-center justify-evenly bg-white text-red-400 h-8 rounded-full w-4/12"
                    onClick={() => handleAdd(result)}
                  >
                    <FaHeart />
                    Nominate
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
