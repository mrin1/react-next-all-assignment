import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes/Route";
import { ContextProvider } from "./hooks/context/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={Routes} />
      </ContextProvider>
    </>
  );
}

export default App;
