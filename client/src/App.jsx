import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Signin from "./pages/Signin"
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="my-20">
      <Outlet />
      </div>
      <Signin/>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }, 
      {
        path:'/post/:id',
        element:<Single/>
      },
      {
        path:'/write',
        element:<Write/>
      }
    ]
  }

])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
