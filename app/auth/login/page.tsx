"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverUrl } from "@/lib/utils";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? "Loading..." : "Sign in"}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginUser, initialState);
  const router = useTransitionRouter();
  async function loginUser(prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { message: "Please fill in all required fields." };
    }

    const body = JSON.stringify({ email, password });

    try {
      const response = await fetch(`${serverUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          message:
            errorData.message || "An error occurred. Please try again later.",
        };
      }

      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      return {
        message: "Network error. Please check your connection and try again.",
      };
    }
  }
  return (
    <div>
      <form action={formAction} className="space-y-6">
        <p aria-live="polite">{state?.message}</p>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1"
          />
        </div>

        <div>
          <SubmitButton />
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        Dont have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
