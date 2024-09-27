"use server";

import { serverUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export const createUser = async (prevState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone_number = formData.get("phone_number") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;

  if (!name || !email || !password || !phone_number) {
    return { message: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: "Please enter a valid email address." };
  }

  if (!/^\d{10}$/.test(phone_number)) {
    return { message: "Please enter a valid phone number." };
  }

  if (password.length < 8) {
    return { message: "Password must be at least 8 characters long." };
  }

  const body = JSON.stringify({
    name,
    email,
    password,
    phone_number,
    city,
    country,
  });

  const response = await fetch(`${serverUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    credentials: "include",
  });

  if (!response.ok) {
    //log the response
    console.log(response);
    return { message: "An error occurred. Please try again later." };

  }

  redirect("/auth/verify-link");
};
