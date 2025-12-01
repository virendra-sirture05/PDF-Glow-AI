import { FileText, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import DeletePdfDialog from "./DeletePdfDialog";
import Link from "next/link";
import DeleteButton from "./delete-button";
import {formatDistanceToNow} from 'date-fns'

interface PdfCardProps {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  completed : string,
  onDelete: () => void;
}

export const SummaryCard = ({id, title, description, createdAt, completed, onDelete }: PdfCardProps) => {
  return (
    <Card className="group relative overflow-hidden border border-gray-200 bg-white hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="mt-1 p-2.5 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl group-hover:shadow-md transition-shadow">
              <FileText className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
                {title}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {formatDistanceToNow(new Date(createdAt), {addSuffix : true})}
              </p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DeleteButton summaryId={id} onDelete={onDelete} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {description}
        </p>
        {completed && (
          <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 font-medium">
            ✓ Completed
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};