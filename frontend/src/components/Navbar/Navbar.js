import React, { useEffect, useState } from "react"
import cblogo from "../../img/cblogo.PNG"
import { Outlet, Link } from "react-router-dom"
import "./Navbar.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faX } from "@fortawesome/free-solid-svg-icons"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(false)
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

  let handleToggle = () => {
    setNavbarOpen((prev) => !prev)
  }

  return (
    <>
      <header>
        <div className='logo'>
          <img src={cblogo} alt='' />
          <a href=''>CropTure</a>
        </div>

        <nav className='nonBurger'>
          <ul className='nav_links'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <a href='/#howto'>How To Use</a>
            </li>
            <li>
              <a href='/disease'>Explore</a>
            </li>
            <li>
              <a href='/#about'>About</a>
            </li>
          </ul>
        </nav>
        <a className='cta' href='/app'>
          <button>
            <Link className='cta-Start' to='/app' onClick={handleToggle}>
              Start
            </Link>
          </button>
        </a>

        <nav className='Burger'>
          <button className='burger-button' onClick={handleToggle}>
            {navbarOpen ? " " : " "}
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <button className='burger-button-close' onClick={handleToggle}>
              {navbarOpen ? " " : " "}
              <FontAwesomeIcon icon={faX} />
            </button>
            <li>
              <Link to='/' onClick={handleToggle}>
                Home
              </Link>
            </li>
            <li>
              <a href='/#howto' onClick={handleToggle}>
                How To Use
              </a>
            </li>
            <li>
              <a href='/disease' onClick={handleToggle}>
                Explore
              </a>
            </li>
            <li>
              <a href='/#about' onClick={handleToggle}>
                About
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar
