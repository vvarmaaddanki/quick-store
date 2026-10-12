import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>

      <p className="price">${product.price.toFixed(2)}</p>
      <p>Rating: {product.rating} / 5</p>
    </article>
  );
}