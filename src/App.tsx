import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"; //利用しない
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Report from "./pages/Report";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
