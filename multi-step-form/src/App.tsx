import { RouterProvider } from "react-router-dom";
import { FormProvider } from "./context/FormProvider";
import Route from "./routes/Route";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <FormProvider>
        <RouterProvider router={Route} />
        <Toaster position={"top-right"} richColors/>
      </FormProvider>
    </>
  );
}

export default App;
