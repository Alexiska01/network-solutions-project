import { Link } from "react-router-dom";
import { SafeImage } from "@/components/ui/safe-image";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      <SafeImage
        src="/img/104c7de0-7c29-41ab-97ee-97f064ac7ecd.jpg"
        alt="iDATA"
        className="h-8 w-auto object-contain hover:opacity-80 transition-opacity px-0 mx-0 my-0 py-[3px]"
      />
    </Link>
  );
};

export default Logo;