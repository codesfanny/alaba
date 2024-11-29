import { useNavigate } from "react-router-dom";

const Blog404 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/bloglist");
  };

  return (
    <div>
      <h1>This blog post does not exist</h1>
      <button onClick={handleClick}>Go back home</button>
    </div>
  );
};

export default Blog404;
