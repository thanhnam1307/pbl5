import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Marketplace from "./pages/Marketplace";
import Features from "./pages/Features";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Auth Layout - Không có Header/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Layout */}
          <Route
            path="*"
            element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/features" element={<Features />} />
                    {/* <Route path="/admin" element={<Admin />} /> */}
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="user" element={<Users />} />
            <Route path="product" element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
