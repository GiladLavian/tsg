import { BaseHttpService, ApiResponse } from './http.service';

/**
 * Health and monitoring service
 * Handles system health checks and monitoring operations
 */
export class HealthService extends BaseHttpService {
  /**
   * Check API health
   */
  async healthCheck(): Promise<ApiResponse<HealthStatus>> {
    const response = await this.api.get('/health');
    return response.data;
  }

  /**
   * Get detailed system status
   */
  async getSystemStatus(): Promise<ApiResponse<SystemStatus>> {
    return this.get<SystemStatus>('/health/status');
  }

  /**
   * Get database connection status
   */
  async getDatabaseStatus(): Promise<ApiResponse<DatabaseStatus>> {
    return this.get<DatabaseStatus>('/health/database');
  }

  /**
   * Get external service dependencies status
   */
  async getDependenciesStatus(): Promise<ApiResponse<DependencyStatus[]>> {
    return this.get<DependencyStatus[]>('/health/dependencies');
  }

  /**
   * Ping endpoint for basic connectivity check
   */
  async ping(): Promise<ApiResponse<PingResponse>> {
    return this.get<PingResponse>('/health/ping');
  }
}

/**
 * Health status interface
 */
export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
}

/**
 * System status interface
 */
export interface SystemStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  services: ServiceStatus[];
  metrics: SystemMetrics;
  timestamp: string;
}

/**
 * Service status interface
 */
export interface ServiceStatus {
  name: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime: number;
  lastCheck: string;
  message?: string;
}

/**
 * System metrics interface
 */
export interface SystemMetrics {
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  cpuUsage: {
    percentage: number;
    loadAverage: number[];
  };
  diskUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  networkStats: {
    bytesReceived: number;
    bytesSent: number;
    connectionsActive: number;
  };
}

/**
 * Database status interface
 */
export interface DatabaseStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  connectionPool: {
    active: number;
    idle: number;
    total: number;
  };
  responseTime: number;
  lastMigration?: string;
  tablesCount: number;
}

/**
 * Dependency status interface
 */
export interface DependencyStatus {
  name: string;
  url: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime: number;
  lastCheck: string;
  version?: string;
  message?: string;
}

/**
 * Ping response interface
 */
export interface PingResponse {
  message: string;
  timestamp: string;
  responseTime: number;
}

// Export singleton instance
export const healthService = new HealthService();
export default healthService;
