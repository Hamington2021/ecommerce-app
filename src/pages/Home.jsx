import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";
import Footer from "../components/Footer";
import { getCart } from "../services/localStorage";
import { getReviews } from "../services/localStorage";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("default");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    setCart(getCart());

    // Listen for cart changes
    const handleStorageChange = () => {
      setCart(getCart());
    };
    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-page cart updates
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((p) => p.price <= Number(priceRange.max));
    }

    // Sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => {
          const aReviews = getReviews(a.id);
          const bReviews = getReviews(b.id);
          const aRating =
            aReviews.length > 0
              ? (a.rating + aReviews.reduce((sum, r) => sum + r.rating, 0)) /
                (aReviews.length + 1)
              : a.rating;
          const bRating =
            bReviews.length > 0
              ? (b.rating + bReviews.reduce((sum, r) => sum + r.rating, 0)) /
                (bReviews.length + 1)
              : b.rating;
          return bRating - aRating;
        });
        break;
      case "name":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <h1>E-Commerce Store</h1>
          <Link to="/cart" className="cart-link">
            🛒 Cart ({cartItemCount})
          </Link>
        </div>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </header>

      <div className="main-content">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />

        <div className="products-section">
          <div className="products-header">
            <h2>
              {filteredProducts.length} Product
              {filteredProducts.length !== 1 ? "s" : ""}
            </h2>
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <p className="no-products">
                No products found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
