"use server";

import { serverUrl } from "@/lib/utils";
import { cookies } from "next/headers";

export const addContact = async (prevState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const phone_number = formData.get("phone_number") as string;

  if (!name || !phone_number) {
    return { message: "Please fill in all required fields." };
  }

  if (!/^\d{10}$/.test(phone_number)) {
    return { message: "Please enter a valid phone number." };
  }

  const body = JSON.stringify({
    name,
    phone_number,
  });

  const session_token = cookies().get("session_token")?.value;

  const response = await fetch(`${serverUrl}/add-contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_token=${session_token}`,
    },
    body,
  });

  if (!response.ok) {
    return { message: "An error occurred. Please try again later." };
  }

  return { message: "Contact added successfully." };
};

export const getContacts = async () => {
  const session_token = cookies().get("session_token")?.value;

  const response = await fetch(`${serverUrl}/get-my-contacts`, {
    headers: {
      Cookie: `session_token=${session_token}`,
    },
    method: "POST",
  });

  if (!response.ok) {
    return { message: "An error occurred. Please try again later." };
  }

  return response.json();
};

export const getGlobalContacts = async () => {
  const session_token = cookies().get("session_token")?.value;

  const response = await fetch(`${serverUrl}/get-global-contacts`, {
    headers: {
      Cookie: `session_token=${session_token}`,
    },
  });

  if (!response.ok) {
    return { message: "An error occurred. Please try again later." };
  }

  return response.json();
};

export const markSpam = async (phone_number: string, isSpam: boolean) => {
  const body = JSON.stringify({ phone_number });

  const session_token = cookies().get("session_token")?.value;
  const url = isSpam ? `${serverUrl}/unmark-spam` : `${serverUrl}/mark-spam`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session_token=${session_token}`,
      },
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message:
          errorData.message || "An error occurred. Please try again later.",
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: isSpam ? "Contact unmarked as spam." : "Contact marked as spam.",
      spam_likelihood: data.spam_likelihood,
    };
  } catch (error) {
    console.error("Error in markSpam:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const getUser = async (id: string) => {
  const session_token = cookies().get("session_token")?.value;

  const response = await fetch(`${serverUrl}/get-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_token=${session_token}`,
    },
    body: JSON.stringify({ user_id: id }),
  });
  

  if (!response.ok) {
    return { message: "An error occurred. Please try again later." };
  }

  return response.json();
};
