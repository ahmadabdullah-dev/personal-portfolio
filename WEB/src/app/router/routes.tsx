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
import RequireAdminRole from "./RequireAdminRole";
import UpdateBlog from "../../features/blogs/UpdateBlog";
import AllTranslations from "../../features/translation/AllTranslations";
import TranslationDetails from "../../features/translation/TranslationDetail";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "contact", element: <CreateContact /> },
      { path: "blogs", element: <AllBlogs /> },
      { path: "blog/:slug", element: <BlogDetails /> },
      { path: "login", element: <RequestLoginForm /> },
      { path: "translations", element: <AllTranslations /> },
      { path: "translation/:slug", element: <TranslationDetails /> },

      {
        element: <RequireAuth />,
        children: [
          {
            element: <RequireAdminRole />,
            children: [
              { path: "admin", element: <AdminDashboard /> },
              { path: "blog/update/:slug", element: <UpdateBlog /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
