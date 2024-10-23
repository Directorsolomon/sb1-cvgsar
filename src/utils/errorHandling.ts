import { AxiosError } from 'axios';
import { ErrorResponse } from '../types';

export class CustomError extends Error {
  code: string;
  details?: Record<string, unknown>;

  constructor(message: string, code: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.details = details;
  }
}

export function handleApiError(error: unknown): CustomError {
  if (error instanceof CustomError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const apiError: ErrorResponse = error.response?.data || {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    };

    return new CustomError(apiError.message, apiError.code, {
      ...apiError.details,
      status: error.response?.status,
      statusText: error.response?.statusText,
    });
  }

  console.error('Unhandled error:', error);
  return new CustomError('An unexpected error occurred', 'UNKNOWN_ERROR', { originalError: error });
}

export function logError(error: CustomError): void {
  console.error(`Error [${error.code}]:`, error.message, error.details);
}