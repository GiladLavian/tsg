import { Router, Request, Response } from 'express';
import { FormService } from '../services/form.service';
import { validateRequest } from '../middlewares/validation.middleware';
import { asyncHandler } from '../middlewares/error.middleware';
import { ApiUtils } from '../utils/api.utils';
import { formSubmissionSchema, formSchemaSchema, createDynamicValidation } from '../utils/server-validation.utils';

const router = Router();

/**
 * POST /api/forms/submit
 * Submit form data
 */
router.post('/submit', 
  validateRequest(formSubmissionSchema),
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const submission = await FormService.createSubmission(req.body.data);
      const response = ApiUtils.success(submission, 'Form submitted successfully');
      res.status(201).json(response);
    } catch (error: any) {
      if (error.message === 'Duplicate submission detected') {
        const response = ApiUtils.error('Duplicate submission detected', 'This form has already been submitted with the same data');
        res.status(409).json(response);
      } else {
        throw error;
      }
    }
  }),
);

/**
 * GET /api/forms/submissions
 * Get all form submissions
 */
router.get('/submissions', 
  asyncHandler(async (req: Request, res: Response) => {
    const submissions = await FormService.getAllSubmissions();
    const response = ApiUtils.success(submissions, 'Submissions retrieved successfully');
    res.json(response);
  }),
);

/**
 * GET /api/forms/submissions/:id
 * Get a specific form submission by ID
 */
router.get('/submissions/:id', 
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const submission = await FormService.getSubmissionById(id);
    
    if (!submission) {
      const response = ApiUtils.error('Submission not found', 'No submission found with the provided ID');
      res.status(404).json(response);
      return;
    }
    
    const response = ApiUtils.success(submission, 'Submission retrieved successfully');
    res.json(response);
  }),
);

/**
 * POST /api/forms/schema
 * Create or update a form schema
 */
router.post('/schema', 
  validateRequest(formSchemaSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const schema = await FormService.saveFormSchema(req.body);
    const response = ApiUtils.success(schema, 'Form schema saved successfully');
    res.status(201).json(response);
  }),
);

/**
 * GET /api/forms/schema/:name
 * Get a form schema by name
 */
router.get('/schema/:name', 
  asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;
    const schema = await FormService.getFormSchema(name);
    
    if (!schema) {
      const response = ApiUtils.error('Schema not found', 'No form schema found with the provided name');
      res.status(404).json(response);
      return;
    }
    
    const response = ApiUtils.success(schema, 'Schema retrieved successfully');
    res.json(response);
  }),
);

/**
 * GET /api/forms/schemas
 * Get all form schemas
 */
router.get('/schemas', 
  asyncHandler(async (req: Request, res: Response) => {
    const schemas = await FormService.getAllFormSchemas();
    const response = ApiUtils.success(schemas, 'Schemas retrieved successfully');
    res.json(response);
  }),
);

/**
 * POST /api/forms/validate
 * Validate form data against a schema
 */
router.post('/validate', 
  asyncHandler(async (req: Request, res: Response) => {
    const { schemaName, data } = req.body;
    
    if (!schemaName || !data) {
      const response = ApiUtils.error('Invalid request', 'Both schemaName and data are required');
      res.status(400).json(response);
      return;
    }
    
    const schema = await FormService.getFormSchema(schemaName);
    if (!schema) {
      const response = ApiUtils.error('Schema not found', 'No form schema found with the provided name');
      res.status(404).json(response);
      return;
    }
    
    const validator = createDynamicValidation(schema);
    const { error } = validator.validate(data, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map((detail: any) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      
      const response = ApiUtils.validationError(errors);
      res.status(400).json(response);
      return;
    }
    
    const response = ApiUtils.success(null, 'Validation passed');
    res.json(response);
  }),
);

export default router;
