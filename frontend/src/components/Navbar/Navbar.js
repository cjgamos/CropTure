import React, { useEffect } from "react"
import cblogo from "../../img/cblogo.PNG"
import { Outlet, Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 200) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  })
  let navbarClasses = ["navbar"]
  if (scrolled) {
    navbarClasses.push("scrolled")
  }

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
              <Link to='/'>Home</Link>
            </li>
            <li>
              <a href='/#about'>About</a>
            </li>
            <li>
              <a href='/#howto'>How To Use</a>
            </li>
            <li>
              <a href='/disease'>Explore</a>
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
