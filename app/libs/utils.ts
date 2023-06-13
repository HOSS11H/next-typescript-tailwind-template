import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRegExpFromRoutes(routes: string[]) {
  const escapedRoutes = routes.map(route => route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regExpRoutes = escapedRoutes.map(route => route.replace(/\/:\w+/g, '\/([^/]+)'));
  const pattern = regExpRoutes.join('|');
  const finalPattern = `^((${pattern})\/.*)$`; // Modified pattern to allow additional path segments
  return new RegExp(finalPattern);
}
