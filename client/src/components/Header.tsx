import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/UseAppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/"> OucBooking.com </Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center bg-white text-blue-700 px-3 font-bold rounded hover:bg-gray-200 hover:text-blue-800"
              >
                Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center bg-white text-blue-700 px-3 font-bold rounded hover:bg-gray-200 hover:text-blue-800"
              >
                Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-white text-blue-700 px-3 font-bold rounded hover:bg-gray-200 hover:text-blue-800"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
