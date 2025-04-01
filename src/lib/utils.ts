
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Indian Standard Time zone
export const TIMEZONE_IST = "Asia/Kolkata"

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

// Format a date with time for display
export function formatDisplayDateTime(dateString: string): string {
  try {
    const date = parseISO(dateString)
    return format(date, "MMM d, yyyy h:mm a")
  } catch (error) {
    console.error("Error formatting date and time:", error)
    return dateString
  }
}

// Generate a future date for scheduling (days from now)
export function getScheduledDate(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString()
}

// Format a relative time (e.g., "2 hours ago", "in 3 days")
export function formatRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)
    
    // Future date
    if (diffInSeconds > 0) {
      if (diffInSeconds < 60) return `in ${diffInSeconds} seconds`
      if (diffInSeconds < 3600) return `in ${Math.floor(diffInSeconds / 60)} minutes`
      if (diffInSeconds < 86400) return `in ${Math.floor(diffInSeconds / 3600)} hours`
      return `in ${Math.floor(diffInSeconds / 86400)} days`
    }
    
    // Past date
    const absDiff = Math.abs(diffInSeconds)
    if (absDiff < 60) return `${absDiff} seconds ago`
    if (absDiff < 3600) return `${Math.floor(absDiff / 60)} minutes ago`
    if (absDiff < 86400) return `${Math.floor(absDiff / 3600)} hours ago`
    return `${Math.floor(absDiff / 86400)} days ago`
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return dateString
  }
}

// Get current date and time in IST
export function getCurrentISTDateTime(): Date {
  const now = new Date()
  // Use the date-fns-tz to format the date in IST, then create a new Date from it
  const istDateTimeString = formatInTimeZone(now, TIMEZONE_IST, "yyyy-MM-dd'T'HH:mm:ss")
  return new Date(istDateTimeString)
}

// Check if post should be published based on time field (moved to posts.ts - kept for backwards compatibility)
export function isPostPublished(): boolean {
  return true; // This is just a stub - actual implementation is in posts.ts
}
