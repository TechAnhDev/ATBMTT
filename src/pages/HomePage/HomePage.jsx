import './HomePage.scss'
import KeyIcon from '@mui/icons-material/Key'
import KeyOffIcon from '@mui/icons-material/KeyOff'
import { Paper } from '@mui/material'
import { act, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function HomePage() {
  const [active, setActive] = useState(true)
  const handleEncription = () => {
    setActive(true)
  }
  const handleDecription = () => {
    setActive(false)
  }
  return (
    <div className="containerhomepage">
      <div className="sidebar">
        <Link to="/">
          <button className={active == true ? 'btn active' : ''} onClick={handleEncription}>
            <KeyIcon />
            Giấu tin
          </button>
        </Link>
        <Link to="/decryption">
          <button className={active == false ? 'btn active' : ''} onClick={handleDecription}>
            <KeyOffIcon />
            Lấy tin
          </button>
        </Link>
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="contact">
        <p>@duongvietanh</p>
        <p>@ATBMTT</p>
      </div>
    </div>
  )
}

export default HomePage
