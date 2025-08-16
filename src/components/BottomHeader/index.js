import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { BsCart4 } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { IoIosWarning } from 'react-icons/io'
import './index.css'

const BottomHeader = () => {
  return (
    <nav className="bottom-nav-container">
      <Link to="/rent" className="nav-item">
        <MdOutlineProductionQuantityLimits className="nav-icon" />
        <p className="nav-text">Keep Rent</p>
      </Link>

      <Link to="/my-products" className="nav-item">
        <BsCart4 className="nav-icon" />
        <p className="nav-text">My Products</p>
      </Link>

      <Link to="/update-stocks" className="nav-item">
        <GrUpdate className="nav-icon" />
        <p className="nav-text">Update Yours Stocks</p>
      </Link>

      <Link to="/guidelines" className="nav-item">
        <IoIosWarning className="nav-icon" />
        <p className="nav-text">Guidelines</p>
      </Link>
    </nav>
  )
}

export default BottomHeader