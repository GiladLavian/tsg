import { Router, Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { asyncHandler } from '../middlewares/error.middleware';
import { ApiUtils } from '../utils/api.utils';

const router = Router();

/**
 * GET /api/analytics
 * Get comprehensive analytics data
 */
router.get('/', 
  asyncHandler(async (req: Request, res: Response) => {
    const analytics = await AnalyticsService.getAnalytics();
    const response = ApiUtils.success(analytics, 'Analytics data retrieved successfully');
    res.json(response);
  }),
);

export default router;
