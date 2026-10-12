import { CartProvider }  from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import { useEffect, useMemo, useState } from "react";
import { getProducts, getCategories } from "./api/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import "./App.css";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError("");

    getProducts({ search, category })
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch(() => {
        if (!ignore) setError("Could not load products. Check your internet connection.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [search, category]);

  const visibleProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, sort]);

  return (
    <main>
      <h1>QuickStore</h1>
      <Link to="/cart" className="view-cart-link">
          View Cart
  </Link>
      <p>Explore our products</p>

      <SearchBar onSearch={setSearch} />

      <FilterBar
        categories={categories}
        category={category}
        onCategory={setCategory}
        sort={sort}
        onSort={setSort}
      />

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && visibleProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && !error && (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProductsPage />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}