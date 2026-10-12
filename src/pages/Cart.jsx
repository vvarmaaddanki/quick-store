import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      {cart.map((item) => (
        <article className="cart-item" key={item.id}>
          <img src={item.thumbnail} alt={item.title} />

          <div className="cart-item-info">
            <h3>{item.title}</h3>
            <p>${item.price.toFixed(2)} each</p>

            <label>
              Quantity:{" "}
              <input
                type="number"
                min="1"
                max={item.stock}
                value={item.quantity}
                onChange={(e) => {
                  const quantity = Number(e.target.value);

                  if (
                    Number.isInteger(quantity) &&
                    quantity >= 1 &&
                    quantity <= item.stock
                  ) {
                    updateQuantity(item.id, quantity);
                  }
                }}
              />
            </label>

            <p>
              Subtotal: $
              {(item.price * item.quantity).toFixed(2)}
            </p>

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </article>
      ))}

      <h2>Grand Total: ${total.toFixed(2)}</h2>

      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>

      <p><Link to="/">Continue Shopping</Link></p>
    </main>
  );
}