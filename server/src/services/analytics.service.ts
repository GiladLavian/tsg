import { prisma } from '../config/database';
import { AnalyticsData } from '../types/analytics.types';

/**
 * Service for handling analytics data
 */
export class AnalyticsService {
  /**
   * Get comprehensive analytics data
   */
  static async getAnalytics(): Promise<AnalyticsData> {
    const submissions = await prisma.formSubmission.findMany();
    
    const analytics: AnalyticsData = {
      totalSubmissions: submissions.length,
      submissionsByGender: this.calculateSubmissionsByGender(submissions),
      averageAge: this.calculateAverageAge(submissions),
      submissionsByDate: this.calculateSubmissionsByDate(submissions),
      topFormFields: this.calculateTopFormFields(submissions),
    };
    
    return analytics;
  }
  
  /**
   * Calculate submissions by gender
   */
  private static calculateSubmissionsByGender(submissions: any[]): Record<string, number> {
    const genderCounts: Record<string, number> = {};
    
    submissions.forEach(submission => {
      const data = submission.data as Record<string, any>;
      const gender = data.gender || data.Gender;
      
      if (gender && typeof gender === 'string') {
        genderCounts[gender] = (genderCounts[gender] || 0) + 1;
      }
    });
    
    return genderCounts;
  }
  
  /**
   * Calculate average age from submissions
   */
  private static calculateAverageAge(submissions: any[]): number | undefined {
    const ages: number[] = [];
    
    submissions.forEach(submission => {
      const data = submission.data as Record<string, any>;
      const age = data.age || data.Age;
      
      if (age && !isNaN(Number(age))) {
        ages.push(Number(age));
      }
    });
    
    if (ages.length === 0) return undefined;
    
    return ages.reduce((sum, age) => sum + age, 0) / ages.length;
  }
  
  /**
   * Calculate submissions by date
   */
  private static calculateSubmissionsByDate(submissions: any[]): Record<string, number> {
    const dateCounts: Record<string, number> = {};
    
    submissions.forEach(submission => {
      const date = new Date(submission.createdAt).toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    
    return dateCounts;
  }
  
  /**
   * Calculate most common form fields
   */
  private static calculateTopFormFields(submissions: any[]): Record<string, number> {
    const fieldCounts: Record<string, number> = {};
    
    submissions.forEach(submission => {
      const data = submission.data as Record<string, any>;
      
      Object.keys(data).forEach(field => {
        fieldCounts[field] = (fieldCounts[field] || 0) + 1;
      });
    });
    
    return fieldCounts;
  }
}
