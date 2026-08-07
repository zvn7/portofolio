import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatMonthYear(date: string | Date): string {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}
