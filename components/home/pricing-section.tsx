import { Check, Sparkles } from "lucide-react";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

export default function PricingSection() {
  const plans: PriceType[] = [
    {
      name: "Basic",
      price: 9,
      description: "Perfect for getting started",
      items: [
        "5 PDF uploads per month",
        "Standard processing speed",
        "Email support",
        "Export to text",
      ],
      id: "basic",
      paymentLink: "",
      priceId: "",
    },
    {
      name: "Pro",
      price: 19.99,
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
      paymentLink: "",
      priceId: "",
    },
  ];

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto max-w-3xl">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-rose-500 to-rose-800 bg-clip-text text-transparent">
            Simple Pricing
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card/50 backdrop-blur-sm border-2 rounded-lg p-4 transition-all duration-500 hover:scale-105 ${
                plan.id === "pro"
                  ? "border-rose-500 shadow-lg shadow-rose-500/20 md:scale-105"
                  : "border-border hover:border-rose-500/50 hover:shadow-md"
              }`}
            >
              {/* Popular Badge */}
              {plan.id === "pro" && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-rose-800 text-white px-3 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md animate-pulse">
                  <Sparkles size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <div className="text-center mb-3">
                <h3 className="text-base font-bold mb-0.5 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-[10px]">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-4">
                <div className="flex items-baseline justify-center gap-0.5 mb-0.5">
                  <span className="text-3xl text-muted-foreground font-semibold">$</span>
                  <span className="text-3xl font-black  text-black font-bold">
                    {plan.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-[10px] font-medium">
                  per month
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {plan.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-1.5 group">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Check
                        size={8}
                        className="text-white"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-[11px] text-foreground/90 leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-2 rounded-md font-bold text-xs transition-all duration-300 transform active:scale-95 ${
                  plan.id === "pro"
                    ? "bg-gradient-to-r from-rose-600 to-rose-800  text-white shadow-md shadow-rose-500/50 hover:shadow-lg hover:shadow-rose-500/60 hover:-translate-y-0.5"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border hover:border-rose-500/50"
                }`}
              >
                {plan.id === "pro" ? "Get Started →" : "Start Free →"}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-muted-foreground text-[10px] mt-6 flex items-center justify-center gap-1.5">
          <Check size={12} className="text-rose-500" />
          All plans include secure storage and data encryption
        </p>
      </div>
    </section>
  );
}