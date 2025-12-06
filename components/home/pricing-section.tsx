"use client";

import { Check, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Simple variants - NO COMPLEXITY
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// LEFT SIDE ANIMATION
const cardVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PricingSection() {
  const { user } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

  const plans: PriceType[] = [
    {
      name: "Basic",
      price: 500,
      description: "Perfect for getting started",
      items: [
        "5 PDF uploads per month",
        "Standard processing speed",
        "Email support",
        "Export to text",
      ],
      id: "basic",
    },
    {
      name: "Pro",
      price: 999,
      description: "For power users and professionals",
      items: [
        "Unlimited PDF uploads",
        "Advanced AI analysis",
        "Priority processing",
        "24/7 Priority support",
        "Export to multiple formats",
        "Custom summaries",
      ],
      id: "pro",
    },
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan: PriceType) => {
    if (!user) {
      alert("Please login to continue");
      return;
    }

    setLoading(plan.id);

    try {
      console.log("🚀 Starting payment for plan:", plan.id);

      const res = await loadRazorpayScript();

      if (!res) {
        alert(
          "Razorpay SDK failed to load. Please check your internet connection."
        );
        setLoading(null);
        return;
      }

      console.log("✅ Razorpay script loaded");

      console.log("📡 Creating order...");
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId: plan.id }),
      });

      console.log("Response status:", orderResponse.status);

      const responseData = await orderResponse.json();
      console.log("Response data:", responseData);

      if (!orderResponse.ok) {
        const errorMessage =
          responseData.error ||
          responseData.details ||
          "Failed to create order";
        alert(`Error: ${errorMessage}`);
        console.error("❌ Order creation failed:", responseData);
        setLoading(null);
        return;
      }

      console.log("✅ Order created successfully:", responseData.orderId);

      const razorpayKey =
        responseData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      console.log("🔑 Razorpay Key:", razorpayKey ? "Found" : "Missing");

      if (!razorpayKey) {
        alert(
          "Razorpay key not configured. Please check environment variables."
        );
        setLoading(null);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: responseData.amount,
        currency: responseData.currency,
        name: "PDF Summarizer",
        description: `${plan.name} Plan`,
        order_id: responseData.orderId,
        prefill: {
          name: user.fullName || "",
          email: user.emailAddresses[0]?.emailAddress || "",
        },
        theme: {
          color: "#f43f5e",
        },
        handler: async function (response: any) {
          console.log("💳 Payment successful, verifying...");
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan.id,
              }),
            });

            const verifyData = await verifyResponse.json();
            console.log("Verification response:", verifyData);

            if (verifyResponse.ok) {
              alert("🎉 Payment successful! Your plan is now active.");
              window.location.reload();
            } else {
              alert(
                `Payment verification failed: ${
                  verifyData.error || "Unknown error"
                }`
              );
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
            setLoading(null);
          },
        },
      };

      console.log("Opening Razorpay checkout...");

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(null);
    } catch (error: any) {
      console.error("❌ Payment error:", error);
      alert(`Error: ${error.message}`);
      setLoading(null);
    }
  };

  return (
    <MotionSection
      id="pricing"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="py-8 px-4 bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      <div className="container mx-auto max-w-3xl">
        <MotionDiv variants={itemVariants} className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-rose-500 to-rose-800 bg-clip-text text-transparent">
            Simple Pricing
          </h2>
        </MotionDiv>

        <div className="grid md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <MotionDiv
              key={plan.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className={`relative bg-card/50 backdrop-blur-sm border-2 rounded-lg p-4 transition-colors duration-300 cursor-pointer ${
                plan.id === "pro"
                  ? "border-rose-500 shadow-lg shadow-rose-500/20"
                  : "border-border hover:border-rose-500/50"
              }`}
            >
              {plan.id === "pro" && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-rose-800 text-white px-3 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md animate-pulse">
                  <Sparkles
                    size={12}
                    className="animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                  Most Popular
                </div>
              )}

              <div className="text-center mb-3">
                <h3 className="text-base font-bold mb-0.5 text-foreground">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-[10px]">
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-4">
                <div className="flex items-baseline justify-center gap-0.5 mb-0.5">
                  <span className="text-3xl text-muted-foreground font-semibold">
                    ₹
                  </span>
                  <span className="text-3xl font-black text-black font-bold">
                    {plan.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-[10px] font-medium">
                  per month
                </p>
              </div>

              <ul className="space-y-2 mb-4">
                {plan.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-1.5 group">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Check size={8} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[11px] text-foreground/90 leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(plan)}
                disabled={loading === plan.id}
                className={`w-full py-2 rounded-md font-bold text-xs transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                  plan.id === "pro"
                    ? "bg-gradient-to-r from-rose-600 to-rose-800 text-white shadow-md shadow-rose-500/50 hover:shadow-lg hover:shadow-rose-500/60 hover:-translate-y-0.5"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border hover:border-rose-500/50"
                } ${
                  loading === plan.id ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>{plan.id === "pro" ? "Get Started →" : "Start Free →"}</>
                )}
              </button>
            </MotionDiv>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-[10px] mt-6 flex items-center justify-center gap-1.5">
          <Check size={12} className="text-rose-500" />
          All plans include secure storage and data encryption
        </p>
      </div>
    </MotionSection>
  );
}
