"use server";

import apiClient from "@/services/api";
import { LOGIN } from "@/services/api/queries";
import { ApiConfigOptions, ApiError, ApiResponse, User } from "@/types";
import { cookies } from "next/headers";

export interface AuthResponse {

  access_token: string;
  user: User;
}

export async function loginUser(
  provider: "Credentials" | "google" | "apple",
  body: any
) {
  try {
                //@ts-ignore
    const res = await apiClient<AuthResponse>(LOGIN, {
      body,
    });

    const cookieStore = await cookies();
    
    const { user, access_token } = res?.data;
    console.log("auth-server-action",res?.data);

    if (user && access_token) {
      cookieStore.set("UT", access_token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
      console.log(cookieStore.get("UT"))
      cookieStore.set("ID", user.id, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });

      return { user, success: true };
    }


    return { success: false, error: "Invalid response from server" };
  } catch (error: ApiError | any) {
    console.log("auth-server-action-error", error, error.response);

    console.log("auth server action error", error);
    return {
      success: false,
      error: error.response.data.message || "An unexpected error occurred",
      status: error.response.data.status,
    };
  }
}

export async function executeServerAction<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  config: ApiConfigOptions<TResponse, TBody> = {}
): Promise<{ data: ApiResponse<TResponse> | null; error: ApiError | null }> {
  try {
    const data = await apiClient(endpoint, config);
    console.log({ serverRes: data });
    return {
      data,
      error: null,
    };
  } catch (error: ApiError | any) {
    //* we need to catch error here even if there is a catch inside the api client
    return {
      data: null,
      error,
    };
  }
}

export async function executeServerActionBulk<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  config: ApiConfigOptions<TResponse, TBody> = {}
): Promise<{ data: ApiResponse<TResponse> | null; error: ApiError | null }> {
  try {
    const data = await apiClient(endpoint, config); // No need to map `data` to `body`

    console.log({ serverRes: data });

    return {
      data,
      error: null,
    };
  } catch (error: ApiError | any) {
    return {
      data: null,
      error,
    };
  }
}

