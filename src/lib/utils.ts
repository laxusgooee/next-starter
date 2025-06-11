import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 300,
): (...args: Parameters<T>) => void {
  let lastRan: number | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (!lastRan || now - lastRan >= limit) {
      func(...args);
      lastRan = now;
    }
  };
}

export const formatErrorMessage = (error: any, message?: string): string => {
  return (
    error.response?.data?.message ??
    error.response?.message ??
    error.message ??
    (message || "Something went wrong")
  );
};
