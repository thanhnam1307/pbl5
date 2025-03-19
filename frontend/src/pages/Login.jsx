import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      if (response) {
        toast.success("Đăng nhập thành công!", { position: "top-right" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Lỗi máy chủ, vui lòng thử lại!", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Đăng nhập tài khoản
          </h1>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <Link to="#" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Đăng nhập
            </button>

            {/* Register link */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
