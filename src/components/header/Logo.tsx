import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://cdn.poehali.dev/files/0eff40a3-b365-4fad-b10d-9f08d095a1f8.png"
        alt="iDATA"
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
};

export default Logo;
