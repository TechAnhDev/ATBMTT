import { Outlet } from 'react-router-dom'
import NavBar from '~/components/NavBar/NavBar'
import './Layout.scss'

function Layout() {
  return (
    <div className="container">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
