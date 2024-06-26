import AllItems from "./Screens/AllItems";
import Messages from "./Screens/Messages";
import Dashboard from "./Screens/Dashboard";
import ItemPage from "./Screens/ItemPage";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Template from "./Template";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    default: true,
    children: [
      {
        path: "/allItems",
        element: <AllItems />,
        exact: true,
      },
      {
        path: "/",
        element: <AllItems />,
        exact: true,
      },
      {
        path: "/messages",
        element: <Messages />,
        exact: true,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        exact: true,
      },
      {
        path: "/ItemPage/:itemId",
        element: <ItemPage />,
        exact: true,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
