import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx"

import Dashboard from "./screens/Dashboard.jsx";
import ClientesIndex from "./screens/clientes/ClientesIndex.jsx";
import Etapas from "./screens/Etapas.jsx";
import Relatorios from "./screens/Relatorios.jsx";
import { ClientesBase } from "./screens/clientes/ClientesBase.jsx";
import { ClienteDetalhes } from "./screens/clientes/ClienteDetalhes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
        handle: { title: "Dashboard"}
      },
      {
        path: "/clientes",
        element: <ClientesBase/>,
        children: [
          { index: true, element: <ClientesIndex/>, handle: { title: "Clientes"}},
          { path: ":id", element: <ClienteDetalhes/>, handle: { title: ""}}
        ]
      },
      {
        path: "/etapas",
        element: <Etapas/>,
        handle: { title: "Etapas" }
      },
      {
        path: "/relatorios",
        element: <Relatorios/>,
        handle: { title: "Relatórios"}
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);