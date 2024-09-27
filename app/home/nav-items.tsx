"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import { Link, useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      <Link
        href="/home"
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          pathname === "/home"
            ? "border-blue-500 text-gray-900"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        Home
      </Link>
      <Link
        href="/home/global-database"
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
          pathname === "/home/global-database"
            ? "border-blue-500 text-gray-900"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        Global Database
      </Link>
    </div>
  );
}

export function LogoutButton() {
  const router = useTransitionRouter();
  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <Button
        onClick={async () => {
          const message = await logout();
          console.log(message);
          router.refresh();
        }}
        variant="outline"
      >
        Logout
      </Button>
    </div>
  );
}
