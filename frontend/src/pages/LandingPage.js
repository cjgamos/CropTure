import React from "react"
import "../css/LandingPage.css"
import vaselogo from "../img/vase.png"
import howto1 from "../img/howto1.png"

function LandingPage() {
  return (
    <>
      <body>
        <div className='backgroundLandingPage'></div>

        <div className='content-1'>
          <h3>ABOUT</h3>
          <h1>CROPTURE</h1>
        </div>

        <div className='about-content-1'>
          <img src={vaselogo} alt='' />
          <div>
            <h1>CROPTURE</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
              porro, voluptates excepturi corrupti numquam quia eos quaerat,
              fuga error libero tempore nulla eius earum provident perferendis
              reiciendis ducimus ad minus?
            </p>
          </div>
        </div>

        <div className='about-content-2'>
          <div>
            <h1>CROPTURE</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
              porro, voluptates excepturi corrupti numquam quia eos quaerat,
              fuga error libero tempore nulla eius earum provident perferendis
              reiciendis ducimus ad minus?
            </p>
          </div>
          <img src={vaselogo} alt='' />
        </div>

        <div className='backgroundLandingPage2'>
          <div className='content-2'>
            <h3>HOW TO USE</h3>
            <h1>CROPTURE</h1>
          </div>

          <div className='howto-content-1'>
            <div>
              <h1>CROPTURE</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
                porro, voluptates excepturi corrupti numquam quia eos quaerat,
                fuga error libero tempore nulla eius earum provident perferendis
                reiciendis ducimus ad minus?
              </p>
            </div>
            <img src={howto1} alt='' />
          </div>

          <div className='howto-content-1'></div>
        </div>
      </body>
    </>
  )
}

export default LandingPage
