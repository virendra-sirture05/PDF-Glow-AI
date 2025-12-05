"use client";
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, FileText } from "lucide-react";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVariants } from "@/utils/constants";

const DEMO_SUMMARY = `# Next.js - The React Framework for Production

. ✨ Build full-stack web applications with React, enhanced with powerful features for production.
. 📌 Perfect blend of performance, developer experience, and modern web capabilities.

# Framework Overview

. 📄 Type: Full-Stack React Framework
. 🎯 For: Modern web developers building scalable applications

# Key Highlights

. 🚀 Server-side rendering and static generation out of the box
. ⭐ File-based routing system - zero configuration needed
. 🔍 Built-in API routes for backend functionality

# Why It Matters

Next.js revolutionizes React development by solving common challenges like SEO, performance, and routing. It's trusted by leading companies worldwide and powers millions of websites with blazing-fast performance and incredible developer experience.

# Main Points

. 💡 Hybrid rendering - Choose SSR, SSG, or ISR per page
. 🛠️ Automatic code splitting and optimized bundle sizes
. 📈 Production-ready with built-in TypeScript and ESLint support

# Pro Tips

. ⭐ Use Image component for automatic optimization and lazy loading
. 💬 Leverage API routes to build full-stack apps without separate backend
. 📝 Deploy to Vercel in seconds with zero configuration needed

# Key Terms to Know

. 📘 SSR (Server-Side Rendering): Renders pages on server for better SEO and performance
. 📙 SSG (Static Site Generation): Pre-builds pages at build time for maximum speed
. 📕 ISR (Incremental Static Regeneration): Updates static pages without full rebuild

# Bottom Line

. 🔑 Next.js is the go-to framework for building production-ready React applications with optimal performance and developer experience.`;

export const SummaryDemo = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const sections = useMemo(() => {
    const parsedSections: { title: string; content: string }[] = [];
    const lines = DEMO_SUMMARY.split("\n");
    let currentTitle = "";
    let currentContent: string[] = [];

    lines.forEach((line) => {
      if (line.trim().startsWith("#")) {
        if (currentTitle || currentContent.length > 0) {
          parsedSections.push({
            title: currentTitle || "Introduction",
            content: currentContent.join("\n").trim(),
          });
        }
        currentTitle = line.replace(/^#+\s*/, "").trim();
        currentContent = [];
      } else {
        if (line.trim()) currentContent.push(line);
      }
    });

    if (currentTitle || currentContent.length > 0) {
      parsedSections.push({
        title: currentTitle || "Summary",
        content: currentContent.join("\n").trim(),
      });
    }

    return parsedSections;
  }, []);

  const wordCount = useMemo(() => {
    return DEMO_SUMMARY.split(/\s+/).filter((word) => word.length > 0).length;
  }, []);

  const totalPages = sections.length;
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="w-full max-w-2xl mt-12 mx-auto p-3 relative">
      {/* Background Card Effect */}
      <div className="absolute inset-0 -translate-y-2 translate-x-1.5 scale-[1.04] rounded-2xl bg-white/90 shadow-xl border border-rose-100" />

      {/* Main Card */}
      <Card className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-rose-50">
        {/* Progress Bar */}
        <div className="relative h-1 bg-gradient-to-r from-rose-100 to-pink-100">
          <div
            className="absolute h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            {/* Word Count */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-rose-100 rounded-lg">
                <FileText className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Words</p>
                <p className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {wordCount}
                </p>
              </div>
            </div>

            {/* Page Number */}
            <div className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full shadow-md">
              <p className="text-xs font-bold text-white">
                {currentPage + 1} / {totalPages}
              </p>
            </div>
          </div>

          {/* Title */}
          <MotionDiv
            key={currentPage}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <BookOpen className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-bold text-gray-800">
              {sections[currentPage]?.title || "Summary"}
            </h2>
          </MotionDiv>
          <div className="h-0.5 w-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full" />
        </div>

        {/* Content Area */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          animate="visible"
          exit={"exit"}
          className="px-4 pb-4"
        >
          <div className="relative min-h-[180px] p-4 bg-white rounded-xl shadow-inner border border-gray-100">
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-rose-100 to-transparent rounded-bl-full opacity-50" />
            <p className="relative text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
              {sections[currentPage]?.content || "No content available"}
            </p>
          </div>
        </MotionDiv>

        {/* Navigation */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-8 h-8 p-0 rounded-full shadow-md disabled:opacity-40 bg-white border-2 border-gray-200 hover:border-rose-300"
              variant="outline"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-1.5">
              {sections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`rounded-full transition-all ${
                    i === currentPage
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 w-6 h-2.5 shadow-md"
                      : "bg-gray-300 w-2.5 h-2.5"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={currentPage === totalPages - 1}
              className="w-8 h-8 p-0 rounded-full shadow-md bg-gradient-to-r from-rose-500 to-pink-600 text-white disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryDemo;
