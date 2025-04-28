import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Report from "./pages/Report";

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
  return <RouterProvider router={router} />;
}

export default App;
