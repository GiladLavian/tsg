import {
  Alert,
  AppBar,
  Box,
  Container,
  Snackbar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useDashboard } from "../../context/dashboard.context";
import { FormSchema } from "../../types/form.types";
import { SubmitFormTab, SubmissionsTab, AnalyticsTab } from "../../components/dashboard";

// Sample form schema (this would normally come from the API)
const sampleSchema: FormSchema = {
  name: "user-registration",
  description: "User registration form with personal information",
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      minLength: 2,
      maxLength: 50,
      placeholder: "Enter your first name",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
      minLength: 2,
      maxLength: 50,
      placeholder: "Enter your last name",
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Enter your email address",
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      required: true,
      min: 13,
      max: 120,
      placeholder: "Enter your age",
    },
    {
      name: "gender",
      type: "dropdown",
      label: "Gender",
      required: true,
      options: ["Male", "Female", "Other", "Prefer not to say"],
    },
    {
      name: "birthDate",
      type: "date",
      label: "Date of Birth",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "Phone Number",
      required: false,
      placeholder: "Enter your phone number",
      validation: {
        pattern: "^[+]?[1-9]?[0-9]{7,15}$",
        message: "Please enter a valid phone number",
      },
    },
    {
      name: "bio",
      type: "text",
      label: "Bio",
      required: false,
      maxLength: 500,
      placeholder: "Tell us about yourself...",
    },
  ],
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export const DashboardContent: React.FC = () => {
  const { state, actions } = useDashboard();
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Extract functions to avoid dependency issues
  const { fetchSubmissions, fetchAnalytics } = actions;

  // Load initial data
  useEffect(() => {
    fetchSubmissions();
    fetchAnalytics();
  }, [fetchSubmissions, fetchAnalytics]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    },
    []
  );

  const handleFormSubmitSuccess = useCallback((_data: any) => {
    setSnackbar({
      open: true,
      message: "Form submitted successfully!",
      severity: "success",
    });
  }, []);

  const handleFormSubmitError = useCallback((error: string) => {
    setSnackbar({
      open: true,
      message: `Submission failed: ${error}`,
      severity: "error",
    });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [snackbar]);

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dynamic Form System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Dynamic Form Generation Dashboard
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Submit forms dynamically and view real-time analytics
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Submit Form" />
            <Tab label="View Submissions" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <SubmitFormTab
            schema={sampleSchema}
            onSubmitSuccess={handleFormSubmitSuccess}
            onSubmitError={handleFormSubmitError}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <SubmissionsTab
            submissions={state.submissions}
            loading={state.loading.submissions}
            error={state.error.submissions}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <AnalyticsTab
            data={state.analytics}
            loading={state.loading.analytics}
            error={state.error.analytics}
          />
        </TabPanel>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
