// Utility function to generate unique IDs
export function generateUniqueId(prefix: string = ''): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const uniqueId = `${timestamp}-${random}`;
  return prefix ? `${prefix}-${uniqueId}` : uniqueId;
}