import Image from "next/image";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { IMovie } from "../types/types";

interface MovieCardProps {
  result: IMovie;
  color: string;
  nominatedList: boolean;
  disableBtn?: boolean;
  handler: (result: IMovie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  result,
  color,
  handler,
  nominatedList,
  disableBtn,
}) => {
  return (
    <div
      key={result.imdbID}
      className={`flex flex-col h-auto justify-center text-white ${color} p-5 rounded-lg shadow-xl`}
    >
      <h4 className="text-xl font-bold">{result.Title}</h4>
      <div className="flex justify-between w-full text-md font-semibold">
        <p>{result.Year}</p>
        <p>{result.Type}</p>
      </div>
      <br />
      {!nominatedList && (
        <Image
          className="object-cover rounded-md shadow-md"
          src={result.Poster !== "N/A" ? result.Poster : "/unavailable.png"}
          alt={result.Title}
          height={400}
          width={250}
        />
      )}
      <br />
      <button
        disabled={disableBtn}
        name={nominatedList ? "Unnominate" : "Nominate"}
        className={`flex items-center justify-around bg-white ${
          disableBtn ? "text-gray-400" : "text-red-400"
        } h-8 rounded-full w-7/12 xl:w-6/12 md:w-5/12 shadow-md`}
        onClick={() => handler(result)}
      >
        {nominatedList ? (
          <>
            <FaHeartBroken />
            Unnominate
          </>
        ) : (
          <>
            <FaHeart />
            Nominate
          </>
        )}
      </button>
    </div>
  );
};

export default MovieCard;
