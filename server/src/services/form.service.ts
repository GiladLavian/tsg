import { prisma } from '../config/database';
import { FormSubmission, FormSchema } from '../types/form.types';
import { deepEqual, sanitizeFormData } from '../utils/api.utils';

/**
 * Service for handling form submissions
 */
export class FormService {
  /**
   * Create a new form submission
   */
  static async createSubmission(data: Record<string, any>): Promise<FormSubmission> {
    // Sanitize the form data
    const sanitizedData = sanitizeFormData(data);
    
    // Check for duplicate submissions
    const isDuplicate = await this.checkDuplicateSubmission(sanitizedData);
    if (isDuplicate) {
      throw new Error('Duplicate submission detected');
    }
    
    // Create the submission
    const submission = await prisma.formSubmission.create({
      data: {
        data: sanitizedData,
      },
    });
    
    return {
      id: submission.id,
      data: submission.data as Record<string, any>,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    };
  }
  
  /**
   * Get all form submissions
   */
  static async getAllSubmissions(): Promise<FormSubmission[]> {
    const submissions = await prisma.formSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return submissions.map(submission => ({
      id: submission.id,
      data: submission.data as Record<string, any>,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    }));
  }
  
  /**
   * Get a form submission by ID
   */
  static async getSubmissionById(id: string): Promise<FormSubmission | null> {
    const submission = await prisma.formSubmission.findUnique({
      where: { id },
    });
    
    if (!submission) return null;
    
    return {
      id: submission.id,
      data: submission.data as Record<string, any>,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    };
  }
  
  /**
   * Check if a submission is a duplicate
   */
  private static async checkDuplicateSubmission(data: Record<string, any>): Promise<boolean> {
    const existingSubmissions = await prisma.formSubmission.findMany();
    
    return existingSubmissions.some(submission => 
      deepEqual(submission.data, data),
    );
  }
  
  /**
   * Create or update a form schema
   */
  static async saveFormSchema(schema: FormSchema): Promise<FormSchema> {
    const savedSchema = await prisma.formSchema.upsert({
      where: { name: schema.name },
      update: {
        schema: schema as any,
        description: schema.description,
      },
      create: {
        name: schema.name,
        schema: schema as any,
        description: schema.description,
      },
    });
    
    return savedSchema.schema as unknown as FormSchema;
  }
  
  /**
   * Get a form schema by name
   */
  static async getFormSchema(name: string): Promise<FormSchema | null> {
    const schema = await prisma.formSchema.findUnique({
      where: { name },
    });
    
    if (!schema) return null;
    
    return schema.schema as unknown as FormSchema;
  }
  
  /**
   * Get all form schemas
   */
  static async getAllFormSchemas(): Promise<FormSchema[]> {
    const schemas = await prisma.formSchema.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    
    return schemas.map(schema => schema.schema as unknown as FormSchema);
  }
}
