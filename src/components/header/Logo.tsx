import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://cdn.poehali.dev/files/0eff40a3-b365-4fad-b10d-9f08d095a1f8.png"
        alt="iDATA"
        className="ml-0 h-5 w-auto sm:h-7 object-contain rounded-0"
      />
    </Link>
  );
};

export default Logo;
