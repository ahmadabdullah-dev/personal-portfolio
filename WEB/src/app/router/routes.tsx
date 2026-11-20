import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFound from "../../features/errors/NotFound";
import ErrorPage from "../../features/errors/ErrorPage";
import AdminDashboard from "../../features/admin/AdminDashboard";
import LandingPage from "../components/LandingPage";
import CreateContact from "../../features/contact/CreateContact";
import RequestLoginForm from "../../features/auth/RequestLoginForm";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/contact", element: <CreateContact /> },
      { path: "/login", element: <RequestLoginForm /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
