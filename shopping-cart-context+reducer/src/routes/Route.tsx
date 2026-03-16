import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Wrapper from "../layout/Wrapper";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper/>,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
