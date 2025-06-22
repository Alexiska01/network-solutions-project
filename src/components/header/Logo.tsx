import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://cdn.poehali.dev/files/b7a2bc8d-4235-406c-8770-8cce8752b5e8.png"
        alt="iDATA"
        className="h-8 w-auto ml-6 object-contain hover:opacity-80 transition-opacity"
      />
    </Link>
  );
};

export default Logo;
