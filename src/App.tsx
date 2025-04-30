import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Report from "./pages/Report";
import { theme } from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
