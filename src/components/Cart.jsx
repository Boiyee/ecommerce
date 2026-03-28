import { useCart } from "../context/CartContext";

export default function Cart({ open, onClose, onCheckout }) {
  const { cart, dispatch, cartCount, cartSubtotal, shippingCost, cartTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            Cart{" "}
            <span className="text-gray-400 font-normal text-sm">({cartCount})</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 font-medium text-sm">Your cart is empty</p>
                <p className="text-gray-400 text-xs mt-1">Add some products to get started</p>
              </div>
              <button
                onClick={onClose}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">${item.price.toFixed(2)} each</p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })
                        }
                        className="w-6 h-6 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm flex items-center justify-center transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() =>
                          dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })
                        }
                        className="w-6 h-6 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                    <button
                      onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                      className="text-xs text-gray-300 hover:text-rose-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 space-y-4">
            {/* Free shipping notice */}
            {cartSubtotal < 50 && (
              <div className="bg-indigo-50 rounded-xl px-4 py-3 text-xs text-indigo-700">
                Add <span className="font-semibold">${(50 - cartSubtotal).toFixed(2)}</span> more to get free shipping!
              </div>
            )}

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-medium">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-indigo-600 text-white py-3 rounded-full text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-150"
            >
              Checkout →
            </button>

            <button
              onClick={() => dispatch({ type: "CLEAR" })}
              className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
