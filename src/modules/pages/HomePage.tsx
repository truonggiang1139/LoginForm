import { Link } from "react-router-dom";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to={"/product"} className="text-blue-600 ">
        Product
      </Link>
    </div>
  );
};

export default HomePage;
