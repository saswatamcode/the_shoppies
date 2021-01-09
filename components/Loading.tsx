import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <Loader
        type="Puff"
        color="#4E4CE9"
        height={200}
        width={200}
        timeout={3000}
      />
    </div>
  );
};

export default Loading;
