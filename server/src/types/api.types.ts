/**
 * Validation error class for API responses
 */
export class ValidationError {
  field: string;
  message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}

/**
 * Standard API response class
 */
export class ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];

  constructor(
    success: boolean,
    options?: Partial<Omit<ApiResponse<T>, 'success'>>,
  ) {
    this.success = success;
    if (options) {
      Object.assign(this, options);
    }
  }

  /**
   * Create a successful response
   */
  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse<T>(true, { data, message });
  }

  /**
   * Create an error response
   */
  static error<T>(error: string, errors?: ValidationError[]): ApiResponse<T> {
    return new ApiResponse<T>(false, { error, errors });
  }
}

/**
 * Pagination options class
 */
export class PaginationOptions {
  page?: number;
  limit?: number;

  constructor(page?: number, limit?: number) {
    this.page = page;
    this.limit = limit;
  }

  /**
   * Get offset for database queries
   */
  getOffset(): number {
    if (!this.page || !this.limit) return 0;
    return (this.page - 1) * this.limit;
  }

  /**
   * Get limit with default value
   */
  getLimit(defaultLimit: number = 10): number {
    return this.limit || defaultLimit;
  }
}

/**
 * Paginated response class
 */
export class PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };

  constructor(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ) {
    this.data = data;
    this.pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Check if there's a next page
   */
  hasNextPage(): boolean {
    return this.pagination.page < this.pagination.pages;
  }

  /**
   * Check if there's a previous page
   */
  hasPreviousPage(): boolean {
    return this.pagination.page > 1;
  }
}
