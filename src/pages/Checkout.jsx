import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) return;

    const newOrderId = `QS-${Date.now().toString().slice(-8)}`;

    setOrderId(newOrderId);
    setOrderPlaced(true);

    cart.forEach((item) => removeFromCart(item.id));
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <h1>Order Confirmed!</h1>
        <p>Your demo order has been placed successfully.</p>
        <p>Order reference: {orderId}</p>
        <Link to="/">Continue Shopping</Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>
      <h2>Order Total: ${total.toFixed(2)}</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Full Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          City
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Postal Code
          <input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            pattern="[0-9]{6}"
            title="Enter a 6-digit postal code"
            required
          />
        </label>

        <button type="submit">Place Demo Order</button>
      </form>

      <p>
        <Link to="/cart">Back to Cart</Link>
      </p>
    </main>
  );
}