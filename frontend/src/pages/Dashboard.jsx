import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Water Pipes Store
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Your trusted supplier for high-quality water pipes
      </p>
      <Link
        to="/marketplace"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-lg hover:bg-blue-700 transition"
      >
        Explore Products
      </Link>
    </div>
  );
};

export default Dashboard;
