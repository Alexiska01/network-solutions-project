import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://cdn.poehali.dev/files/a8b55522-f8bc-41c7-a484-eaa789e9e35c.png"
        alt="iDATA"
        className="h-7 w-auto sm:h-7 object-contain rounded-0"
      />
    </Link>
  );
};

export default Logo;
