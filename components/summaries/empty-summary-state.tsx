import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmptySummaryState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12">
      <div className="relative mb-6">
        {/* Decorative background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-rose-100 rounded-full opacity-20 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-rose-200 rounded-full opacity-30"></div>
        </div>
        
        {/* File icon */}
        <div className="relative z-10 p-6 bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-lg">
          <FileText className="w-16 h-16 text-rose-600" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
        No Summaries Yet
      </h3>
      
      <p className="text-gray-600 text-center max-w-md mb-8">
        Upload your first PDF to get started and transform your documents into concise, actionable summaries.
      </p>

      <Link href="/upload">
        <Button 
          size="lg"
          className="px-8 py-6 text-base bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create First Summary
        </Button>
      </Link>
    </div>
  );
}

// // Demo to show the component
// function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//             Your Summaries
//           </h1>
//           <p className="text-gray-600 text-sm sm:text-base">
//             Manage and organize your documents
//           </p>
//         </div>
        
//         <EmptySummaryState />
//       </div>
//     </div>
//   );
// }