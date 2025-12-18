import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount, currency = 'IDR') {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateString) {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function maskAccountNumber(accountNumber) {
  if (!accountNumber || accountNumber.length < 4) return accountNumber
  const visiblePart = accountNumber.slice(-4)
  const maskedPart = '*'.repeat(accountNumber.length - 4)
  return maskedPart + visiblePart
}
