import { RouterProvider } from "react-router-dom"
import Route from "./routes/Route"
import { Toaster } from "sonner"

function App() {
 

  return (
    <>
     <RouterProvider router={Route}/>
     <Toaster position="top-right" richColors />
    </>
  )
}

export default App
