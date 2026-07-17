import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import toast from "react-hot-toast";
function CheckoutPage() {
    const { token } = useSelector((state) => state.auth);
    const [cartItems, setCartItems] = useState([]);
    const fetchCart = useCallback(async () => {
        try {
            const { data } = await api.get("/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            setCartItems(data);
        } catch (error) {
            console.error(error);
        }
        }, [token]);

        useEffect(() => {
        if (token) {
            fetchCart();
        }
        }, [token, fetchCart]);
    const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
    );
    const handleCheckout = async () => {
        try {
            const { data } = await api.post(
            "/orders",
            {},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
            const paymentResponse = await api.post(
            "/payment/create-order",
            {
                orderId: data.order._id,
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
            const { razorpayOrder } = paymentResponse.data;

            const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: "Ecommerce Platform",
            description: "Order Payment",
            order_id: razorpayOrder.id,

            handler: async function (response) {
            try {
                const verifyResponse = await api.post(
                "/payment/verify",
                {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: data.order._id,
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                );

                toast.success(verifyResponse.data.message);

                // Redirect to My Orders
                window.location.href = "/orders";

            } catch (error) {
                toast.error(error.response?.data?.message || "Payment verification failed");
            }
            },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            toast.error(error.response?.data?.message || "Checkout failed");
        }
    };
    return (
    <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
        Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Order Items */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-6">
            Order Summary
            </h2>

            <div className="space-y-5">
            {cartItems.map((item) => (
                <div
                key={item._id}
                className="flex gap-4 border-b pb-5 last:border-none"
                >
                <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-contain rounded-lg border bg-gray-50"
                />

                <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                    {item.product.name}
                    </h3>

                    <p className="text-gray-600 mt-2">
                    ₹{item.product.price} × {item.quantity}
                    </p>

                    <p className="font-semibold mt-2">
                    ₹{item.product.price * item.quantity}
                    </p>
                </div>
                </div>
            ))}
            </div>

        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">

            <h2 className="text-2xl font-semibold mb-6">
            Payment Summary
            </h2>

            <div className="space-y-4">

            <div className="flex justify-between">
                <span>Total Items</span>

                <span>
                {cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                )}
                </span>
            </div>

            <div className="flex justify-between">
                <span>Delivery</span>

                <span className="text-green-600 font-semibold">
                FREE
                </span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span>₹{totalPrice}</span>
            </div>

            <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
                Proceed to Payment
            </button>

            </div>

        </div>

        </div>
    </div>
    );
}

export default CheckoutPage;