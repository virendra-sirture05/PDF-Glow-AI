import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

const SubscriptionRequired = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl border-2 border-rose-100 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-rose-600" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Subscription Required
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            To upload PDFs and create AI-powered summaries, you need an active subscription plan. 
            Choose a plan that works best for you!
          </p>

          <div className="space-y-3">
            <Link href="/#pricing">
              <Button className="w-full bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 text-white py-6 text-base font-semibold shadow-lg">
                <Sparkles className="mr-2" size={18} />
                View Pricing Plans
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button 
                variant="outline" 
                className="w-full border-gray-300 text-gray-700 py-6 text-base hover:bg-gray-50"
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              ✨ Pro plan includes <strong>unlimited uploads</strong> and priority support
            </p>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default SubscriptionRequired;