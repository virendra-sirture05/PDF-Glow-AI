"use client";
import { getSummary } from "@/actions/get-summary-action";
import BgGradient from "@/components/common/bg-gradient";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { SummaryCard } from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Type define karo
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

const Page = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]); // Type add kiya
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        setLoading(true);
        const data = await getSummary();
        console.log(data);
        setSummaries(data || []);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  const handleDelete = (id: string) => {
    setSummaries(summaries.filter((summary) => summary.id !== id));
  };``

  return (
    <div className="min-h-screen p- md:px-30 ">
      <BgGradient/>
      <div className="flex justify-between py-8 px-2">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold pb-4 bg-linear-to-r from-gray-700 to-gray-900  bg-clip-text text-transparent ">
            Your Summaries
          </h1>
          <p className="text-gray-600 pl-2">
            Transform your PDF's into concise, actionable insights
          </p>
        </div>
        <div className="pt-3 ">
          <Link href={"/upload"}>
            {" "}
            <Button className="px-6 py-2 bg-linear-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 ">
              <Plus /> New Summary
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-rose-50 px-2 py-2 mx-2 text-rose-600 ">
        <p>
          You have reach the limit of 5 uploads on the basic plan.{" "}
          <Link
            href={"/upload"}
            className="underline underline-offset-4 inline-flex items-center"
          >
            click here to upgrade to pro -
          </Link>{" "}
          for unlimited uploads{" "}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-600">
          Loading summaries...
        </div>
      ) : summaries.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
         <EmptySummaryState/>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">
          {summaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              id={summary.id}
              title={summary.title || summary.file_name || "Untitled"}
              description={summary.summary_text}
              createdAt={summary.created_at}
              completed={summary.status === "completed"}
              onDelete={() => handleDelete(summary.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
