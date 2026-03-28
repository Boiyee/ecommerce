import { useState } from "react";
import { useCart } from "../context/CartContext";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "Nigeria",
  cardNumber: "",
  expiry: "",
  cvv: "",
  nameOnCard: "",
};

export default function Checkout({ onBack }) {
  const { cart, dispatch, cartSubtotal, shippingCost, cartTotal } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [step, setStep] = useState("form"); // form | success
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const validate = () => {
    const required = ["firstName", "lastName", "email", "address", "city", "zip", "cardNumber", "expiry", "cvv"];
    const newErrors = {};
    required.forEach((f) => {
      if (!form[f].trim()) newErrors[f] = "Required";
    });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    return newErrors;
  };

  const handlePlaceOrder = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    dispatch({ type: "CLEAR" });
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-9 h-9 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-400 text-sm mb-2">
            Thank you, {form.firstName}! Your order has been placed successfully.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            A confirmation will be sent to <span className="text-gray-700">{form.email}</span>.
          </p>
          <button
            onClick={onBack}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Form */}
        <div className="lg:col-span-3 space-y-10">

          {/* Contact */}
          <fieldset>
            <legend className="text-base font-medium text-gray-900 mb-5">Contact information</legend>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" error={errors.firstName}>
                <input type="text" placeholder="Jane" value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className={inputClass(errors.firstName)} />
              </Field>
              <Field label="Last name" error={errors.lastName}>
                <input type="text" placeholder="Doe" value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className={inputClass(errors.lastName)} />
              </Field>
              <Field label="Email" error={errors.email} className="col-span-2">
                <input type="email" placeholder="jane@email.com" value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass(errors.email)} />
              </Field>
              <Field label="Phone (optional)" className="col-span-2">
                <input type="tel" placeholder="+234 801 234 5678" value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass()} />
              </Field>
            </div>
          </fieldset>

          {/* Shipping */}
          <fieldset>
            <legend className="text-base font-medium text-gray-900 mb-5">Shipping address</legend>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Street address" className="col-span-2" error={errors.address}>
                <input type="text" placeholder="123 Main St, Apt 4B" value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className={inputClass(errors.address)} />
              </Field>
              <Field label="City" error={errors.city}>
                <input type="text" placeholder="Lagos" value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass(errors.city)} />
              </Field>
              <Field label="Postal code" error={errors.zip}>
                <input type="text" placeholder="100001" value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  className={inputClass(errors.zip)} />
              </Field>
              <Field label="State / Region">
                <input type="text" placeholder="Lagos State" value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className={inputClass()} />
              </Field>
              <Field label="Country">
                <select value={form.country} onChange={(e) => update("country", e.target.value)}
                  className={inputClass()}>
                  {["Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "United States"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset>
            <legend className="text-base font-medium text-gray-900 mb-5">Payment details</legend>
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Credit / Debit Card</span>
                <div className="flex gap-1.5">
                  {["Visa", "MC", "Amex"].map((c) => (
                    <span key={c} className="text-[10px] border border-gray-300 px-1.5 py-0.5 rounded text-gray-400 font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-4">
                <Field label="Name on card">
                  <input type="text" placeholder="Jane Doe" value={form.nameOnCard}
                    onChange={(e) => update("nameOnCard", e.target.value)}
                    className={inputClass()} />
                </Field>
                <Field label="Card number" error={errors.cardNumber}>
                  <input type="text" placeholder="1234  5678  9012  3456" maxLength={19} value={form.cardNumber}
                    onChange={(e) => update("cardNumber", e.target.value)}
                    className={inputClass(errors.cardNumber)} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" error={errors.expiry}>
                    <input type="text" placeholder="MM / YY" maxLength={7} value={form.expiry}
                      onChange={(e) => update("expiry", e.target.value)}
                      className={inputClass(errors.expiry)} />
                  </Field>
                  <Field label="CVV" error={errors.cvv}>
                    <input type="text" placeholder="123" maxLength={4} value={form.cvv}
                      onChange={(e) => update("cvv", e.target.value)}
                      className={inputClass(errors.cvv)} />
                  </Field>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="text-base font-medium text-gray-900 mb-5">Order summary</h2>

            <div className="space-y-3 mb-5">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)} ea</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-900 flex-shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2.5 text-sm mb-5">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200 text-base">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-indigo-600 text-white py-3.5 rounded-full text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-150"
            >
              Place Order
            </button>

            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure, encrypted checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Field helper ─────────────────────────────────────────────────────────────
function Field({ label, error, className = "", children }) {
  return (
    <div className={className}>
      <label className="block text-xs text-gray-500 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full border ${error ? "border-rose-300" : "border-gray-200"} rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-400 bg-white text-gray-900 placeholder-gray-400`;
}
