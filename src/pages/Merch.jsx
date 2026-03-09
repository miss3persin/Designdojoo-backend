import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Merch() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [checkout, setCheckout] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    notes: "",
  });
  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState("");

  const parseNaira = (value) => {
    if (typeof value !== "string") return 0;
    const numeric = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const addToCart = (item) => {
  setCart((prev) => {
    const existingItem = prev.find((i) => i.name === item.name);

    if (existingItem) {
      return prev.map((i) =>
        i.name === item.name
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    }

    return [...prev, { ...item, qty: 1 }];
  });
};


  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };
 

  const subtotal = cart.reduce(
    (sum, item) => sum + parseNaira(item.price) * item.qty,
    0
  );

  const handleCheckoutChange = (e) => {
    setCheckout((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitOrder = async () => {
    setOrdering(true);
    setOrderError("");

    try {
      const response = await fetch("/api/orders/merch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          customer_name: checkout.customer_name,
          customer_phone: checkout.customer_phone,
          customer_email: checkout.customer_email || undefined,
          notes: checkout.notes || undefined,
          currency: "NGN",
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.qty,
            unit_price: parseNaira(item.price),
          })),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail =
          Array.isArray(payload.details) && payload.details.length
            ? payload.details[0].message || payload.details[0].field
            : null;
        throw new Error(detail || payload.error || "Failed to create order");
      }

      if (payload?.whatsapp_url) {
        window.open(payload.whatsapp_url, "_blank", "noopener,noreferrer");
      }

      setCart([]);
      setOpenCart(false);
      setCheckout({ customer_name: "", customer_phone: "", customer_email: "", notes: "" });
    } catch (err) {
      setOrderError(err.message || "Failed to create order");
    } finally {
      setOrdering(false);
    }
  };


  return (
    <main className="bg-[#f8f7f5] min-h-screen">

      {/* Shared Navbar (with bag icon) */}
      <Navbar hideFAQ />

      {/* Merch Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Dojo <span className="text-red-600">Merch</span>
        </h1>

        <p className="mt-2 text-sm text-gray-500 text-center">
          Wear your craft. Premium apparel and accessories for modern builders.
        </p>

        <div className="fixed top-24 right-6 z-20">
  <button
    onClick={() => setOpenCart((prev) => !prev)}
    className="flex items-center gap-3 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium"
  >
    <span>
      {cart.length} {cart.length === 1 ? "Item" : "Items"}
    </span>

    <ShoppingBag className="w-4 h-4 text-red-600" />

    <span className="text-gray-400">|</span>

    <span className="font-semibold">
      ₦{subtotal.toLocaleString()}
    </span>

    <span className="text-red-600">▾</span>
  </button>

  {openCart && (
  <div className="absolute top-full right-0 mt-3 w-[380px] bg-white rounded-xl shadow-xl border border-gray-200 z-50">
    <div className="p-6 max-h-[80vh] overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={() => setOpenCart(false)}>✕</button>
      </div>

      {/* Cart items */}
      <div className="space-y-4">
        {cart.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 items-start border-b pb-4 relative"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 rounded-md object-cover"
            />

            <div className="flex-1 relative">
              <p className="text-sm font-medium text-gray-900">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">
                {item.price}
                <span className="inline-block ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded">
                  Qty: {item.qty}
                </span>
              </p>

              <button
                onClick={() => removeFromCart(item.name)}
                className="absolute bottom-0 right-0 text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between font-semibold mt-2">
          <span>Total</span>
          <span className="text-red-600">
            ₦{subtotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="mt-6 bg-green-50 p-4 rounded-lg text-sm">
        <p className="font-medium text-green-700">Order via WhatsApp</p>
        <p className="text-green-600 text-xs mt-1">
          Click below to send your order details via WhatsApp. We’ll confirm your order and share payment information.
        </p>
      </div>

      {/* Checkout */}
      <div className="mt-4 space-y-3">
        <input
          name="customer_name"
          value={checkout.customer_name}
          onChange={handleCheckoutChange}
          className="input"
          placeholder="Full name"
        />
        <input
          name="customer_phone"
          value={checkout.customer_phone}
          onChange={handleCheckoutChange}
          className="input"
          placeholder="WhatsApp number"
        />
        <input
          name="customer_email"
          value={checkout.customer_email}
          onChange={handleCheckoutChange}
          className="input"
          placeholder="Email (optional)"
        />
        <textarea
          name="notes"
          value={checkout.notes}
          onChange={handleCheckoutChange}
          className="input min-h-[90px]"
          placeholder="Notes (optional)"
        />
        {orderError ? <p className="text-xs text-red-600">{orderError}</p> : null}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setOpenCart(false)}
          className="flex-1 rounded-lg bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 transition"
        >
          Continue Shopping
        </button>

        <button
          onClick={submitOrder}
          disabled={ordering || cart.length === 0}
          className="flex-1 rounded-lg bg-red-600 py-3 text-sm font-semibold text-white text-center hover:bg-red-700 transition disabled:opacity-50"
        >
          {ordering ? "Creating Order..." : "Order on WhatsApp"}
        </button>
      </div>

    </div>
  </div>
)}

</div>



        {/* Products grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Designdojoo Premium T-Shirt", category:"APPAREL", price: "₦5,500", img: "/merch/tshirt-red.png" },
            { name: "Designdojoo Premium T-Shirt (Black)", category: "APPAREL", price: "₦5,500", img: "/merch/tshirt-black.png" },
             { name: "Designdojoo Premium T-Shirt (White)", category: "APPAREL", price: "₦5,500", img: "/merch/tshirt-white.png" },
            { name: "Key Chain", category: "ACCESSORIES", price: "₦1,650", img: "/merch/keychain.jpg" },
            { name: "Lanyard", category:"ACCESSORIES", price: "₦1,850", img: "/merch/lanyard.png" },
            { name: "Tote Bag", category:"ACCESSORIES", price: "₦4,550", img: "/merch/tote-white.png" },
            { name: "PM Cap", categort:"APPAREL", price: "₦4,200", img: "/merch/cap.png" },
            { name: "Tote Bag", category:"ACCESSORIES", price: "₦4,550", img: "/merch/tote-black.png" },
          ].map((item, i) => (
            <div
  key={i}
  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden relative"
>

              <img
                src={item.img}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <span className="absolute top-3 right-3 text-sm font-semibold text-gray-900 bg-white px-2 py-1 rounded-md shadow">
  {item.price}
</span>


              <div className="p-4">

                <p className="text-xs font-semibold text-red-600 uppercase">
      {item.category}
    </p>
                <h3 className="text-sm font-semibold text-gray-900">
                  {item.name}
                </h3>

  

                <button 
                onClick={() => addToCart(item)}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">
  <ShoppingCart className="w-4 h-4" />
  Add to cart
</button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />

     

    </main>
  );
}

export default Merch;
