import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AnalyticsData } from '../../types/analytics.types';
import { LoadingCard, ErrorCard, EmptyStateCard } from '../common/cards';

interface AnalyticsDashboardProps {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

/**
 * Analytics dashboard component displaying submission statistics
 */
export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  data,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <LoadingCard height={120} lines={2} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <ErrorCard
        title="Failed to load analytics"
        message={error}
      />
    );
  }

  if (!data || data.totalSubmissions === 0) {
    return (
      <EmptyStateCard
        title="No analytics data"
        message="Analytics will be available once form submissions are received."
      />
    );
  }

  // Prepare data for charts
  const genderData = data.submissionsByGender
    ? Object.entries(data.submissionsByGender).map(([gender, count]) => ({
        name: gender,
        value: count,
      }))
    : [];

  const dateData = data.submissionsByDate
    ? Object.entries(data.submissionsByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-7) // Last 7 days
        .map(([date, count]) => ({
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          submissions: count,
        }))
    : [];

  const topFields = data.topFormFields
    ? Object.entries(data.topFormFields)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([field, count]) => ({
          field: field.charAt(0).toUpperCase() + field.slice(1),
          count,
        }))
    : [];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Grid container spacing={3}>
      {/* Summary Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total Submissions
            </Typography>
            <Typography variant="h4">
              {data.totalSubmissions.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Average Age
            </Typography>
            <Typography variant="h4">
              {data.averageAge ? `${Math.round(data.averageAge)}` : 'N/A'}
            </Typography>
            {data.averageAge && (
              <Typography variant="body2" color="textSecondary">
                years old
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Gender Diversity
            </Typography>
            <Typography variant="h4">
              {Object.keys(data.submissionsByGender || {}).length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              different genders
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Form Fields
            </Typography>
            <Typography variant="h4">
              {Object.keys(data.topFormFields || {}).length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              unique fields
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Gender Distribution Chart */}
      {genderData.length > 0 && (
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Gender Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Submissions Over Time */}
      {dateData.length > 0 && (
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Submissions Over Time (Last 7 Days)
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={dateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="submissions" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Top Form Fields */}
      {topFields.length > 0 && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Most Common Form Fields
              </Typography>
              <Grid container spacing={2}>
                {topFields.map((field, _index) => (
                  <Grid item xs={12} sm={6} md={4} key={field.field}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{field.field}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {field.count} submissions
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(field.count / data.totalSubmissions) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};
