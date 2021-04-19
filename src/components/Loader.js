import spinner from "./images/spinner.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={spinner} alt="Loading" />
      <h1>Loading</h1>
    </div>
  );
};

export default Loader;
