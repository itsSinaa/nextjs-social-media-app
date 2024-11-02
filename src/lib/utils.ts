import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { fromJSON } from "postcss";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(form: Date) {
  const currentDate = new Date();

  if (currentDate.getTime() - form.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(form, { addSuffix: true });
  }else{
    if(currentDate.getFullYear() === form.getFullYear()){
      return formatDate(form,"MMM d")
    }else{
      return formatDate(form,"MMM d, yyyy")
    }
  }
}
