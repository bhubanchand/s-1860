
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

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
    return dateString
  }
}

// Format a date with time for display
export function formatDisplayDateTime(dateString: string): string {
  try {
    const date = parseISO(dateString)
    return format(date, "MMM d, yyyy h:mm a")
  } catch (error) {
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
    return dateString
  }
}

// Get current date and time in IST
export function getCurrentISTDateTime(): Date {
  return new Date();
}

// Force data refresh when navigating between pages
export function forceDataRefresh() {
  // Clear localStorage cache to force fresh data fetch
  try {
    localStorage.removeItem('blog-posts-cache');
    console.log("Blog posts cache cleared for fresh data fetch");
    return true;
  } catch (e) {
    console.error("Failed to clear cache:", e);
    return false;
  }
}

// Check if data needs refresh (older than specified minutes)
export function needsDataRefresh(minutes: number = 5): boolean {
  try {
    const cachedData = localStorage.getItem('blog-posts-cache');
    if (!cachedData) return true;
    
    const { timestamp } = JSON.parse(cachedData);
    const cacheAge = Date.now() - timestamp;
    
    // Convert minutes to milliseconds for comparison
    return cacheAge > minutes * 60 * 1000;
  } catch (e) {
    return true;
  }
}
