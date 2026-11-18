import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFound from "../../features/errors/NotFound";
import ErrorPage from "../../features/errors/ErrorPage";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
   
      { path: "*", element: <NotFound /> },
    ],
  },
]);
