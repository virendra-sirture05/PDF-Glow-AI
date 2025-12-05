"use client"
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, FileText } from 'lucide-react';

const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const sections = useMemo(() => {
    if (!summary || typeof summary !== 'string') {
      return [{ title: 'No Summary', content: 'No summary available' }];
    }

    const parsedSections: { title: string; content: string }[] = [];
    const lines = summary.split('\n');
    let currentTitle = '';
    let currentContent: string[] = [];

    lines.forEach((line) => {
      if (line.trim().startsWith('#')) {
        if (currentTitle || currentContent.length > 0) {
          parsedSections.push({
            title: currentTitle || 'Introduction',
            content: currentContent.join('\n').trim(),
          });
        }
        currentTitle = line.replace(/^#+\s*/, '').trim();
        currentContent = [];
      } else {
        if (line.trim()) currentContent.push(line);
      }
    });

    if (currentTitle || currentContent.length > 0) {
      parsedSections.push({
        title: currentTitle || 'Summary',
        content: currentContent.join('\n').trim(),
      });
    }

    return parsedSections.length > 0
      ? parsedSections
      : [{ title: 'Summary', content: summary }];
  }, [summary]);

  const wordCount = useMemo(() => {
    if (!summary || typeof summary !== 'string') return 0;
    return summary.split(/\s+/).filter((word) => word.length > 0).length;
  }, [summary]);

  const totalPages = sections.length;
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div
      className="
      w-full 
      max-w-[92vw] 
      sm:max-w-[85vw]
      md:max-w-[70vw] 
      lg:max-w-[55vw]
      xl:max-w-[45vw]
      mx-auto p-3 relative
      mt-12">

      {/* BIG BACKGROUND CARD BEHIND — lifted up + visible */}
      <div
        className="
        absolute 
        inset-0 
        -translate-y-3 
        translate-x-2
        scale-[1.06]
        rounded-3xl 
        bg-white/90 
        shadow-2xl
        border border-rose-100
        "
      />

      {/* ORIGINAL CARD — untouched */}
      <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-rose-50">

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-gradient-to-r from-rose-100 to-pink-100">
          <div
            className="absolute h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">

            {/* Word Count */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <FileText className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Words</p>
                <p className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {wordCount}
                </p>
              </div>
            </div>

            {/* Page Number */}
            <div className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full shadow-lg">
              <p className="text-sm font-bold text-white">
                {currentPage + 1} / {totalPages}
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-bold text-gray-800">
              {sections[currentPage]?.title || 'Summary'}
            </h2>
          </div>

          <div className="h-1 w-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full" />
        </div>

        {/* CONTENT AREA */}
        <div className="px-6 pb-6">
          <div
            className="
            relative 
            min-h-[200px]
            sm:min-h-[230px]
            md:min-h-[260px]
            lg:min-h-[300px]
            xl:min-h-[320px]
            p-5 
            bg-white 
            rounded-2xl 
            shadow-inner 
            border border-gray-100">

            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-rose-100 to-transparent rounded-bl-full opacity-50" />

            <p className="relative text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
              {sections[currentPage]?.content || 'No content available'}
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between gap-4">

            <Button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-10 h-10 p-0 rounded-full shadow-md disabled:opacity-40 bg-white border-2 border-gray-200 hover:border-rose-300"
              variant="outline"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {sections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`rounded-full transition-all ${
                    i === currentPage
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 w-7 h-3 shadow-md'
                      : 'bg-gray-300 w-3 h-3'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 p-0 rounded-full shadow-md bg-gradient-to-r from-rose-500 to-pink-600 text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

          </div>
        </div>

      </Card>
    </div>
  );
};

export default SummaryViewer;
