import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pokemon } from "./components/Pokemon/Pokemon.tsx";

const router = createBrowserRouter([
  {
    path: "/table/",
    element: <App />,
  },
  {
    path: "/table/pokemon/:id",
    element: <Pokemon />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
