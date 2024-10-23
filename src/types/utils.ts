export interface ErrorWithCode extends Error {
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

export type ValidationResult<T> = {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
};