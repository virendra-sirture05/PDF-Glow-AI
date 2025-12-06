"use client";
import { getSummary } from "@/actions/get-summary-action";
import BgGradient from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { SummaryCard } from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { itemVariants } from "@/utils/constants";
import { AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Summary = {
  id: string;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: string;
  title: string | null;
  file_name: string | null;
  created_at: Date;
  updated_at: Date;
};

type SubscriptionData = {
  isSubscribed: boolean;
  planId: string | null;
  uploadCount: number;
};

const Page = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionData>({
    isSubscribed: false,
    planId: null,
    uploadCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch subscription via API
        const [summariesData, subscriptionResponse] = await Promise.all([
          getSummary(),
          fetch("/api/subscription")
        ]);
        
        const subscriptionData = await subscriptionResponse.json();
        
        setSummaries(summariesData || []);
        setSubscription(subscriptionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setSummaries(summaries.filter((summary) => summary.id !== id));
  };

  const isBasicPlan = subscription.isSubscribed && subscription.planId === "basic";
  const isPro = subscription.isSubscribed && subscription.planId === "pro";
  const hasReachedLimit = isBasicPlan && subscription.uploadCount >= 5;

  return (
    <div className="min-h-screen p-4 md:px-30">
      <BgGradient />
      
      <div className="flex justify-between py-8 px-2">
        <div>
          <MotionH1
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            className="text-3xl md:text-5xl font-semibold pb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
          >
            Your Summaries
          </MotionH1>
          <MotionP
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-600 pl-2"
          >
            Transform your PDF's into concise, actionable insights
          </MotionP>
        </div>
        
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          className="pt-3"
        >
          <Link href="/upload">
            <Button 
              disabled={hasReachedLimit}
              className="px-6 py-2 bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus /> New Summary
            </Button>
          </Link>
        </MotionDiv>
      </div>

      {/* Upload Limit Warning - Basic Plan */}
      {isBasicPlan && (
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={`px-4 py-3 mx-2 mb-4 rounded-lg border ${
            hasReachedLimit 
              ? "bg-red-50 text-red-700 border-red-200" 
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              {hasReachedLimit ? (
                <p className="font-medium">
                  You've reached your upload limit of 5 PDFs on the Basic plan.{" "}
                  <Link
                    href="/#pricing"
                    className="underline underline-offset-4 font-semibold hover:text-red-800"
                  >
                    Upgrade to Pro
                  </Link>{" "}
                  for unlimited uploads.
                </p>
              ) : (
                <p>
                  <span className="font-semibold">{subscription.uploadCount}/5 uploads used</span> on Basic plan.{" "}
                  <Link
                    href="/#pricing"
                    className="underline underline-offset-4 hover:text-amber-800"
                  >
                    Upgrade to Pro
                  </Link>{" "}
                  for unlimited access.
                </p>
              )}
            </div>
          </div>
        </MotionDiv>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-600">
          Loading summaries...
        </div>
      ) : summaries.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <EmptySummaryState />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">
          {summaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              id={summary.id}
              title={summary.title || summary.file_name || "Untitled"}
              description={summary.summary_text}
              createdAt={new Date(summary.created_at).toLocaleDateString()}
              completed={summary.status}
              onDelete={() => handleDelete(summary.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;