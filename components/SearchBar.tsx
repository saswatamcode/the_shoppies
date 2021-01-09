import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  search: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  handleChange,
  search,
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-400 rounded-lg shadow-xl p-6 w-full mb-6">
      <div className="flex flex-col gap-3 md:flex-row justify-between text-gray-600">
        <label className="text-white text-2xl font-bold pr-10">
          Movie Title
        </label>
        <div className="flex items-center bg-white h-10 pl-5 rounded-full text-sm md:w-8/12">
          <input
            type="text"
            name="search"
            className="w-11/12 focus:outline-none"
            value={value}
            onChange={handleChange}
            aria-label="Search Field"
          />
          <button
            name="Search"
            aria-label="Search"
            type="submit"
            className="h-8 w-8"
            onClick={search}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
