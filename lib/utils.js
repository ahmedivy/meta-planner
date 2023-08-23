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

export function timeSince(time) {
  const seconds = Math.floor((new Date() - new Date(time)) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)}y`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)}m`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)}d`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)}h`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)}m`;
  }
  return `${Math.floor(seconds)}s`;
}
