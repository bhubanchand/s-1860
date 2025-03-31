
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Indian Standard Time zone
export const TIMEZONE_IST = "Asia/Kolkata"

// Get current date and time in IST
export function getCurrentISTDateTime(): Date {
  const now = new Date()
  return new Date(formatInTimeZone(now, TIMEZONE_IST, "yyyy-MM-dd'T'HH:mm:ss"))
}

// Format a date for display (without time)
export function formatDisplayDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    return format(date, "MMM d, yyyy")
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

// Check if a post should be published based on its scheduledDate
export function isPostPublished(publishDate: string): boolean {
  try {
    const postDate = new Date(publishDate)
    const currentISTTime = getCurrentISTDateTime()
    return postDate <= currentISTTime
  } catch (error) {
    console.error("Error checking publish status:", error)
    return false
  }
}
