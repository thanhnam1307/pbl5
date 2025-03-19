import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URI + "/products";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Biến kiểm tra component có còn mounted không
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        if (isMounted) setProducts(response.data);
      } catch (err) {
        if (isMounted) setError(err.message || "Lỗi khi lấy dữ liệu");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // Cleanup khi component bị unmount
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;
