import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFound from "../../features/errors/NotFound";
import ErrorPage from "../../features/errors/ErrorPage";
import AdminDashboard from "../../features/admin/AdminDashboard";
import LandingPage from "../components/LandingPage";
import CreateContact from "../../features/contact/CreateContact";
import RequestLoginForm from "../../features/auth/RequestLoginForm";
import RequireAuth from "./RequireAuth";
import BlogDetails from "../../features/blogs/BlogDetails";
import AllBlogs from "../../features/blogs/AllBlogs";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/contact", element: <CreateContact /> },
      {
        element: <RequireAuth />,
        children: [{ path: "/admin", element: <AdminDashboard /> }],
      },
      { path: "/blogs", element: <AllBlogs /> },
      { path: "/login", element: <RequestLoginForm /> },
      { path: "*", element: <NotFound /> },
      { path: "blog/:slug", element: <BlogDetails /> },
    ],
  },
]);
