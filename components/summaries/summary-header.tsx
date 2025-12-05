import React from 'react';
import { Sparkles, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SummaryHeaderProps {
  title: string;
  date?: string | Date;
  readTime?: number; // in minutes
}

const SummaryHeader = ({ 
  title, 
  date = new Date(), 
  readTime = 2 
}: SummaryHeaderProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Top Section - Badge, Date, Time, Back Button */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {/* AI Summary Badge */}
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 px-3 py-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-medium">AI Summary</span>
        </Badge>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>

        {/* Read Time */}
        <div className="flex items-center gap-1.5 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{readTime} min read</span>
        </div>

        {/* Back to Dashboard Button */}
        <Link href="/dashboard" className="ml-auto">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {title}
      </h1>
    </div>
  );
};

export default SummaryHeader; 