import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import StudentList from "../pages/admin/StudentList";
import AddStudent from "../pages/admin/AddStudent";
import SignUp from "../pages/SignUp";
import Wrapper from "../layout/Wrapper";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element:<Wrapper />,
    children: [
      {
        path: "student",
        element: <StudentList />,
      },
      {
        path: "student/add",
        element: <AddStudent />,
      },
      {
        path: "student/edit/:id",
        element: <AddStudent />,
      },
    ],
  },
]);

export default Route;
