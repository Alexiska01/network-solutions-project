import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://cdn.poehali.dev/files/2f45b896-23be-4410-ba2a-7ae9852dae2a.png"
        alt="iDATA"
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
};

export default Logo;
