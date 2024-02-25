import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentPlacedOrder } from "../features/order/orderSlice";
import CheckoutForm from "./CheckoutForm";




// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51O9mbySA4Ge94X1WGwccXCVZzbV9zp5U1njVSMlzntOGB2Xpbwa2v0ddgrviG364HwGOVNlDt5wCNPI8vogy4xgT00KEem9twD");

                                  

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
    const currentOrder = useSelector(selectCurrentPlacedOrder)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount, orderId: currentOrder.id })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      )}
    </div>
  );
}