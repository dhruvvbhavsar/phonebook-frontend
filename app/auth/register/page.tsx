"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "next-view-transitions";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "./action";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? "Loading..." : "Sign up"}
    </Button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useFormState(createUser, initialState);
  return (
    <div>
      <form action={formAction} className="space-y-6">
        <p aria-live="polite">{state?.message}</p>
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-1"
          />
        </div>

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
            autoComplete="new-password"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone_number">Phone number</Label>
          <Input
            id="phone_number"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            required
            className="mt-1"
          />
        </div>

        <div>
          <SubmitButton />
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
