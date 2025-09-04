import { BaseType } from './base';

/**
 * Analytics data class
 */
export class AnalyticsData extends BaseType {
  totalSubmissions: number;
  submissionsByGender?: Record<string, number>;
  averageAge?: number;
  submissionsByDate?: Record<string, number>;
  topFormFields?: Record<string, number>;

  constructor(
    totalSubmissions: number,
    options?: Partial<Omit<AnalyticsData, 'totalSubmissions'>>,
  ) {
    super();
    this.totalSubmissions = totalSubmissions;
    if (options) {
      Object.assign(this, options);
    }
  }

  /**
   * Get submission percentage by gender
   */
  getGenderPercentage(gender: string): number {
    if (!this.submissionsByGender || this.totalSubmissions === 0) {
      return 0;
    }
    const count = this.submissionsByGender[gender] || 0;
    return (count / this.totalSubmissions) * 100;
  }

  /**
   * Get most common form field
   */
  getMostPopularField(): string | null {
    if (!this.topFormFields) return null;
    
    let maxField = null;
    let maxCount = 0;
    
    for (const [field, count] of Object.entries(this.topFormFields)) {
      if (count > maxCount) {
        maxCount = count;
        maxField = field;
      }
    }
    
    return maxField;
  }

  /**
   * Get submissions for a specific date
   */
  getSubmissionsForDate(date: string): number {
    return this.submissionsByDate?.[date] || 0;
  }

  /**
   * Get total gender submissions
   */
  getTotalGenderSubmissions(): number {
    if (!this.submissionsByGender) return 0;
    return Object.values(this.submissionsByGender).reduce((sum, count) => sum + count, 0);
  }
}
