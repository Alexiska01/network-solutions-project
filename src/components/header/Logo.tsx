import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <img
        src="https://cdn.poehali.dev/files/7605ada4-006b-4979-8203-35b5c09ec305.png"
        alt="iDATA"
        className="h-8 w-auto object-contain hover:opacity-80 transition-opacity px-0 mx-0 my-0 py-[3px]"
        onError={(e) => {
          console.log("Logo loading error");
          e.currentTarget.style.display = "none";
        }}
        onLoad={() => console.log("Logo loaded successfully")}
      />
    </Link>
  );
};

export default Logo;
