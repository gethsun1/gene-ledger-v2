export const SUPPORTED_FILE_TYPES = {
  'text/csv': '.csv',
  'application/json': '.json',
} as const;

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export const ACCESS_LEVELS = {
  OPEN: 'Open',
  STANDARD: 'Standard', 
  PREMIUM: 'Premium',
} as const;

export const DATA_TYPES = {
  CSV: 'CSV',
  JSON: 'JSON',
} as const;

export const BIOTECH_COLORS = {
  blue: '#3B82F6',
  green: '#10B981',
  violet: '#8B5CF6',
} as const;