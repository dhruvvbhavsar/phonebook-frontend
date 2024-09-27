import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function VerificationSentPage() {
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Verification Email Sent
      </h2>
      <p className="text-gray-600 mb-6">
        We have sent a verification email to your registered email address.
      </p>
      <div className="space-y-4">
        <Button className="w-full" variant="outline" asChild>
          <Link href="/auth/login">Return to Login</Link>
        </Button>
      </div>
    </div>
  );
}
