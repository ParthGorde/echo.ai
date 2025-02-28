import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/homepage/Homepage.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import Chatpage from "./routes/chatpage/Chatpage.jsx";
import RootLayout from "./layouts/rootlayout/Rootlayout.jsx";
import Dashboardlayout from "./layouts/dashboardlayout/Dashboardlayout.jsx";
import Signinpage from "./routes/Signin/Signinpage.jsx";
import Signuppage from "./routes/signup/Signuppage.jsx";




const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/sign-in/*",
        element: <Signinpage />,
      },
      {
        path: "/sign-up/*",
        element: <Signuppage />,
      },

      {
        element: <Dashboardlayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <Chatpage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
