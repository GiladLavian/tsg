import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { DashboardProvider } from "./context/dashboard.context";
import { DashboardContent } from "./pages/dashboard";

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </ThemeProvider>
  );
};

export default App;
