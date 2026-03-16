import { createBrowserRouter } from "react-router-dom";
import BlogDetails from "../pages/BlogDetails";
import AuthorDetails from "../pages/AuthorDetails";
import NotFound from "../pages/NotFound";
import WeatherApp from "../pages/WeatherApp";
import JokeGenarator from "../pages/JokeGenarator";
import Wrapper from "../components/Wrapper";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
const Home = lazy(() => import("../pages/Home"));
const Author = lazy(() => import("../pages/Author"));

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback=<Loading/> >
            <Home/>
          </Suspense>
        ),
      },
      {
        path: "home",
          element: (
          <Suspense fallback=<Loading/> >
            <Home/>
          </Suspense>
        ),
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "author",
         element: (
          <Suspense fallback=<Loading/> >
            <Author/>
          </Suspense>
        ),
      },
      {
        path: "author/:id",
        element: <AuthorDetails />,
      },
      {
        path: "weather",
        element: <WeatherApp />,
      },
      {
        path: "joke",
        element: <JokeGenarator />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default Route;
