import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Report from "./pages/Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/report",
    element: <Report />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
