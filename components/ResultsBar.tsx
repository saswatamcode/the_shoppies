interface ResultBarProps {
  totalResults: number;
  clearSearch: () => void;
}

const ResultBar: React.FC<ResultBarProps> = ({ totalResults, clearSearch }) => {
  return (
    <div className="col-span-2 flex justify-between items-center">
      <h4 className="text-gray-600">Total Results: {totalResults}</h4>
      <button
        onClick={clearSearch}
        className="flex items-center justify-around bg-white text-gray-600 h-8 rounded-full w-6/12 md:w-3/12 shadow-sm"
      >
        Clear Search
      </button>
    </div>
  );
};

export default ResultBar;
