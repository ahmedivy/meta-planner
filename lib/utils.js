import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function absUrl(path) {
  return `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${path}`;
}

export function getAvatar(name) {
  // Vercel Avatars (Microservice API)
  return `https://avatar.vercel.sh/${name}`;
}

export function getApiHeaders() {
  return {
    "Content-Type": "application/json",
    "auth-token": process.env.META_API_TOKEN,
  };
}