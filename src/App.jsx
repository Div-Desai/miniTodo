import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function Loader({ children }) {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: (
          <Loader>
            <Login />
          </Loader>
        ),
      },
      {
        path: "/login",
        element: (
          <Loader>
            <Login />
          </Loader>
        ),
      },
      {
        path: "/signup",
        element: (
          <Loader>
            <Signup />
          </Loader>
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: (
              <Loader>
                <Dashboard />
              </Loader>
            ),
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
