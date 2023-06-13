import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRegExpFromPaths(paths: string[]) {
  const escapedPaths = paths.map(path => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const replacedPaths = escapedPaths.map(path => path.replace(/\/:\w+/g, '/[^/]+'));
  const pattern = replacedPaths.join('|');
  const finalPattern = `^(?:${pattern})$`;
  return new RegExp(finalPattern);
}

export function testPathAgainstRegExp(path: string, regExp: RegExp) {
  const partialMatchRegExp = new RegExp(regExp.source + '|^' + regExp.source + '(.*)');
  return partialMatchRegExp.test(path);
}