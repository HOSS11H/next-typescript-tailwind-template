import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRegExpFromRoutes( routes: String[] ) {
  const escapedRoutes = routes.map((route : String) => route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regExpRoutes = escapedRoutes.map(route => route.replace(/\/:\w+/g, '\/([^/]+)'));
  const pattern = regExpRoutes.join('|');
  return new RegExp(`^(${pattern})$`);
}