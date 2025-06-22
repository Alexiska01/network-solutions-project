import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://cdn.poehali.dev/files/00a02e57-d1dc-45ac-a940-d8afc074eb1c.png"
        alt="iDATA"
        className="h-8 w-auto object-contain hover:opacity-80 transition-opacity"
      />
    </Link>
  );
};

export default Logo;
