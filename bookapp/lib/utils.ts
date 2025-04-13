import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string =>
  name
    .split(" ") // Split by space
    .map((part) => part[0]) // Take first letter of each word
    .join("")
    .toUpperCase()
    .slice(0, 2); // Limit to 2 characters
