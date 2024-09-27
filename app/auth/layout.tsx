import Image from "next/image";
import logo from "@/public/logo.webp";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getSession();

  if (isAuthenticated) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            className="w-28 sm:w-36 lg:w-40 mx-auto pointer-events-none"
            src={logo.src}
            alt="Your Company"
            width={logo.width}
            height={logo.height}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Contact Database
          </h2>
        </div>

        {children}
      </div>
    </div>
  );
}
