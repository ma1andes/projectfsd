import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import Layout from "../widgets/layout/Layout";
import Home from "../pages/Home";
import CreatePage from "../pages/CategoriesPages/CreatePage";
import OnePostPage from "../pages/PostsPages/OnePostPage";
import PostsPage from "../pages/PostsPages/PostsPage";
import AuthPage from "../pages/UsersPages/AuthPage";
import RegPage from "../pages/UsersPages/RegPage";
import ProfilePage from "../pages/UsersPages/ProfilePage";
import CreatePostPage from "../pages/PostsPages/CreatePostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRouter />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/posts",
            element: <PostsPage />,
          },
          {
            path: "/category-create",
            element: <CreatePage />,
          },
          {
            path: "/posts/:id",
            element: <OnePostPage />,
          },
          {
            path: "/create-post",
            element: <CreatePostPage />,
          },
          {
            path: "/auth",
            element: <AuthPage />,
          },
          {
            path: "/reg",
            element: <RegPage />,
          },
          {
            path: "/login",
            element: <Navigate to="/auth" replace />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
