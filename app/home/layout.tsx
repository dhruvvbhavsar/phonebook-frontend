import { Link } from "next-view-transitions";
import NavItems, { LogoutButton } from "./nav-items";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import logo from "@/public/logo.webp";
import Image from "next/image";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/home" className="flex-shrink-0 flex items-center">
                <Image
                  className="w-28 sm:w-36 mx-auto pointer-events-none"
                  src={logo.src}
                  alt="Your Company"
                  width={logo.width}
                  height={logo.height}
                />
              </Link>
              <NavItems />
            </div>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
