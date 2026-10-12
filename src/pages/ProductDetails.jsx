import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    let ignore = false;

    setProduct(null);
    setError("");

    getProduct(id)
      .then((data) => {
        if (!ignore) setProduct(data);
      })
      .catch(() => {
        if (!ignore) setError("Could not load this product.");
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (error) return <main><p>{error}</p><Link to="/">Back to products</Link></main>;
  if (!product) return <main><p>Loading product...</p></main>;

  return (
    <main className="details">
      <img src={product.thumbnail} alt={product.title} />

      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>${product.price.toFixed(2)}</h2>
        <p>Rating: {product.rating} / 5</p>
        <p>Available stock: {product.stock}</p>

        <button type="button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <p><Link to="/">Back to products</Link></p>
      </div>
    </main>
  );
}