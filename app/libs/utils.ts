import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRegExpFromRoutes(routes: string[]) {
  const escapedRoutes = routes.map(route => route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = escapedRoutes.join('|');
  const finalPattern = `^(?:${pattern})$`;
  return new RegExp(finalPattern);
}