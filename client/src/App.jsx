import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout, { ProtectedLayout } from "./Layout";
import Home from "./pages/home";
import Listings from "./pages/listings";
import Login from "./pages/login";
import Register from "./pages/register";
import SingalPage from "./pages/singal-page";
import Profile from "./pages/profile";
import ProfileUpdatePage from "./pages/profile-update";
import CreaetPost from "./pages/create-post";
import {
  listingsLoader,
  profilePageLoader,
  singalPageLoader,
} from "./lib/loaders";

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
        path: "/listings",
        element: <Listings />,
        loader: listingsLoader,
      },
      {
        path: "/:id",
        element: <SingalPage />,
        loader: singalPageLoader,
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Register />,
      },

      {},
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
        loader: profilePageLoader,
      },
      {
        path: "/profile/update",
        element: <ProfileUpdatePage />,
      },
      {
        path: "/create-post",
        element: <CreaetPost />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
