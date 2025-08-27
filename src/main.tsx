import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import AllProducts from './pages/AllProducts.tsx'
import Auth from './pages/Auth.tsx'
import CreateProduct from './pages/CreateProduct.tsx'
import Dashboard from './pages/Dashboard.tsx'
import EditProduct from './pages/EditProduct.tsx'
import Favourites from './pages/Favourites.tsx'
import LogIn from './pages/LogIn.tsx'
import OrderList from './pages/OrderList.tsx'
import Products from './pages/Products.tsx'
import SignUp from './pages/SignUp.tsx'
const roots = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Auth />,
        children: [
          {
            path: "",
            element: <SignUp />,
          },
          {
            path: "/login",
            element: <LogIn />
          }
        ]
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Products />,
            children: [
              {
                path: "",
                element: <AllProducts />
              },
              {
                path: "editproduct/:id",
                element: <EditProduct />
              },
              {
                path: "createproduct",
                element: <CreateProduct />
              }
            ]
          },
          {
            path: "favourites",
            element: <Favourites />
          },
          {
            path: "orderlist",
            element: <OrderList />
          }
        ]
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={roots} />
  </StrictMode>,
)
