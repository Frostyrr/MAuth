/**
 * Utility function to format API & Zod validation errors into human-readable messages.
 */
export const formatErrorMessage = (error: any): string => {
  if (!error) return '';

  // Handle string error (which might be JSON stringified Zod issues array)
  if (typeof error === 'string') {
    try {
      const parsed = JSON.parse(error);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => item?.message || item).join('. ');
      }
      if (parsed?.message) return parsed.message;
    } catch {
      return error;
    }
    return error;
  }

  // Handle object with message property
  if (error.message) {
    if (typeof error.message === 'string') {
      try {
        const parsed = JSON.parse(error.message);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => item?.message || item).join('. ');
        }
        if (parsed?.message) return parsed.message;
      } catch {
        return error.message;
      }
      return error.message;
    }
    if (Array.isArray(error.message)) {
      return error.message
        .map((item: any) => (typeof item === 'string' ? item : item?.message || JSON.stringify(item)))
        .join('. ');
    }
  }

  // Handle object with errors array
  if (Array.isArray(error.errors)) {
    return error.errors
      .map((item: any) => (typeof item === 'string' ? item : item?.message || JSON.stringify(item)))
      .join('. ');
  }

  return 'An error occurred. Please check your information and try again.';
};

export default formatErrorMessage;
