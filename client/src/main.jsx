import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import './index.css'

import App from "./App.jsx"
import Dashboard from "./screens/Dashboard.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Clientes from "./screens/Clientes.jsx";
import Etapas from "./screens/Etapas.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "/clientes",
        element: <Clientes/>
      },
      {
        path: "/etapas",
        element: <Etapas/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);