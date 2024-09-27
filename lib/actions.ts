"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { serverUrl } from "./utils";

export const getSession = cache(async () => {
  const session_token = cookies().get("session_token")?.value;
  let isAuthenticated = false;
  let user = null;

  if (!session_token) {
    return { isAuthenticated, user };
  }

  try {
    const response = await fetch(`${serverUrl}/get-session`, {
      method: "POST",
      headers: {
        Cookie: `session_token=${session_token}`,
      },
    });
    if (response.ok) {
      isAuthenticated = true;
      user = await response.json();
    }
  } catch (error) {
    console.error("Session error:", error);
  } finally {
    return { isAuthenticated, user };
  }
});

export const logout = async () => {
  let message = "";
  try {
    cookies().delete("session_token");
    message = "Logged out successfully";
  } catch {
    message = "Failed to log out";
  }

  return { message };
};
