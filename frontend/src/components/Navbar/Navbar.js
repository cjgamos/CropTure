import React from "react"
import cblogo from "../../img/cblogo.PNG"
import { Outlet, Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  return (
    <>
      <header>
        <div className='logo'>
          <img src={cblogo} alt='' />
          <a href=''>CropTure</a>
        </div>

        <nav>
          <ul className='nav_links'>
            <li>
              <Link to='/#home'>Home</Link>
            </li>
            <li>
              <a href='/#about'>About</a>
            </li>
            <li>
              <a href='/#howto'>How To Use</a>
            </li>
          </ul>
        </nav>
        <a className='cta' href='/app'>
          <button>
            <Link to='/app'>Start</Link>
          </button>
        </a>
      </header>
    </>
  )
}

export default Navbar
