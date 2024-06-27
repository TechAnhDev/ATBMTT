import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import EnCryption from './components/EnCryption/EnCryption'
import DeCryption from './components/DeCryption/DeCryption'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          children: [
            {
              index: true,
              element: <EnCryption />
            },
            {
              path: '/decryption',
              element: <DeCryption />
            }
          ]
        }
        // {
        //   path: '/blog',
        //   element: <Blog />
        // },
        // {
        //   path: '/banner',
        //   element: <BannerAddPage />
        // },
        // {
        //   path: '/list',
        //   element: <ListPage />,
        //   children: [
        //     {
        //       index: true,
        //       element: <Products />
        //     }
        //   ]
        // }
        // {
        //   path:"/profile",
        //   element:<ProfilePage/>
        // },
        // {
        //   path:"/login",
        //   element:<Login/>
        // },
        // {
        //   path:"/register",
        //   element:<Register/>
        // }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
