import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import Listings from "./pages/listings";
import Login from "./pages/login";
import Register from "./pages/register";
import SingalPage from "./pages/singal-page";
import Profile from "./pages/profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: ,
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <Listings />,
        },
        {
          path: "/:id",
          element: <SingalPage />,
        },
        {
          path: "/sign-in",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
