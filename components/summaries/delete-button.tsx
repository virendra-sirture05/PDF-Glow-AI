"use client";

import { deletePdf } from "@/actions/delete-summary";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
  summaryId: string;
  onDelete: (id: string) => void;
}

export default function DeleteButton({
  summaryId,
  onDelete,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    startTransition(() => {
      // ✅ Async logic ko promise ke andar wrap karo
      deletePdf({ summaryId }).then((result) => {
        if (!result.success) {
          toast.error("Failed to delete summary");
          return;
        }

        toast.success("Summary deleted successfully");
        onDelete(summaryId); // ✅ Parent component ko notify karo
        router.refresh();
      }).catch((error) => {
        console.error("Delete error:", error);
        toast.error("An error occurred while deleting");
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Delete Summary?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            This action cannot be undone. This will permanently delete your PDF
            summary from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel className="mt-0" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}