import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="bg-gray-900 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              water pipes
            </span>
          </Link>

          {/* Menu điều hướng */}
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 text-white">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/company" className="hover:text-gray-300">
                  Company
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-gray-300">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-gray-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-gray-300">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Hiển thị user hoặc Login/Register */}
          <div className="flex items-center lg:order-2">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Hiển thị tên user */}
                <span className="text-white font-medium">
                  Hello {user.name}
                </span>

                {/* Nút Logout */}
                <button
                  onClick={logout}
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                {/* Nút Login */}
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                >
                  Log in
                </Link>

                {/* Nút Register */}
                <Link
                  to="/#"
                  className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
