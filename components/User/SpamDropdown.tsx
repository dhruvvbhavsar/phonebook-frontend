"use client";
import { MoreVertical, Flag } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { markSpam } from "@/app/home/actions";
import { toast } from "sonner";
import { useTransitionRouter } from "next-view-transitions";

export default function SpamDropdown({
  isSpam,
  phone_number,
}: {
  isSpam: boolean;
  phone_number: string;
}) {
  const {refresh} = useTransitionRouter();
  const handleClick = async () => {
    const promise = markSpam(phone_number, isSpam);
    toast.promise(promise, {
      loading: "Updating spam status...",
      success: isSpam ? "Unmarked as spam" : "Marked as spam",
      error: "Failed to update spam status",
    });

    refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isSpam ? (
          <DropdownMenuItem onClick={handleClick}>
            <Flag className="mr-2 h-4 w-4" />
            <span>Unmark as Spam</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleClick}>
            <Flag className="mr-2 h-4 w-4" />
            <span>Mark as Spam</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
