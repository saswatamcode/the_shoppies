import Image from "next/image";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { IMovie } from "../types/types";

interface MovieCardProps {
  result: IMovie;
  color: string;
  nominated: boolean;
  handler: (result: IMovie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  result,
  color,
  handler,
  nominated,
}) => {
  return (
    <div
      key={result.imdbID}
      className={`flex flex-col h-auto justify-center text-white bg-${color} p-5 rounded-lg shadow-xl`}
    >
      <h4 className="text-xl font-bold">{result.Title}</h4>
      <div className="flex justify-between w-full text-md font-semibold">
        <p>{result.Year}</p>
        <p>{result.Type}</p>
      </div>
      <br />
      {!nominated && (
        <Image
          className="object-cover rounded-md shadow-md"
          src={result.Poster}
          alt={result.Title}
          height={400}
          width={250}
        />
      )}
      <br />
      <button
        className="flex items-center justify-around bg-white text-red-400 h-8 rounded-full w-5/12"
        onClick={() => handler(result)}
      >
        {nominated ? (
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
