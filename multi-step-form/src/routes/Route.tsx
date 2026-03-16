import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import AddressPage from "../pages/Address";
import NotFoundPage from "../pages/NotFound";
import PersonalInfoPage from "../pages/PersonalInfo";
import PreferencesPage from "../pages/Preferences";
import SummaryPage from "../pages/Summary";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <PersonalInfoPage />,
      },
      {
        path: "/address",
        element: <AddressPage />,
      },
      {
        path: "/preferences",
        element: <PreferencesPage />,
      },
      {
        path: "/summary",
        element: <SummaryPage />,
      },
    ],
  },
]);
export default Route;
