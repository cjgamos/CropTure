import React from "react"
import "../css/LandingPage.css"
import cblogo from "../img/cblogo.PNG"
import vaselogo from "../img/vase.png"
import howto1 from "../img/howto1.png"
import howto2 from "../img/howto2.png"
import howto3 from "../img/howto3.png"
import howto4 from "../img/howto4.png"
import what from "../img/What.png"
import why from "../img/Why.png"

function LandingPage() {
  return (
    <>
      <body>
        <div className='backgroundLandingPage' id='home'>
          <img src={cblogo} alt='' />
          <h1>Farmer's Daily Aiding Tool</h1>
          <hr />
          <h2>
            WEB-BASED CROPS DISEASE DETECTION AND CLASSIFICATION USING DEEP
            LEARNING
          </h2>
        </div>

        <div className='content-1' id='about'>
          <h3>ABOUT</h3>
          <h1>CROPTURE</h1>
        </div>

        <div className='about-content-1'>
          <img src={what} alt='' />
          <div>
            <h1>WHAT IS CROPTURE?</h1>
            <p>
              Cropture is a system where users can upload or take a picture of
              the disease-affected crop directly to their devices' cameras. It
              is an innovative and automated way for farmers to detect, classify
              and get possible diagnoses and treatments on their crops in
              real-time
            </p>
          </div>
        </div>

        <div className='about-content-2'>
          <div>
            <h1>WHY USE CROPTURE?</h1>
            <p>
              Cropture is a scientific-based platform for crop disease detection
              and classification using Deep Learning techniques. With this, it
              can generate more confidence for the farmers in a way that they
              have an idea of what disease they are dealing with to take
              appropriate action against it.
            </p>
          </div>
          <img src={why} alt='' />
        </div>

        <div className='backgroundLandingPage2' id='howto'>
          <div className='content-2'>
            <h3>HOW TO USE</h3>
            <h1>CROPTURE</h1>
          </div>

          <div className='howto-content-1'>
            <div>
              <h1>
                STEP 1 <br />
                (UNANG HAKBANG)
              </h1>
              <p>
                Click the Get Started button at the upper right portion of the
                webpage to be able to start and run the system.
                <br />
                <br />
                (Pindutin ang Get Started button na matatagpuan sa kanang
                bahaging parte ng webpage para maumpisahan at tumakbo ang
                sistema.)
              </p>
            </div>
            <img src={howto1} alt='' />
          </div>

          {/* <div className='howto-content-2'>
            <img src={howto2} alt='' />
            <div>
              <h1>
                STEP 2 <br />
                (PANGALAWANG HAKBANG)
              </h1>
              <p>
                Minimize the current browser by tapping the box-icon on enabling
                to drag the photo you have been taken.
                <br />
                <br />
                (Paliitin ang browser sa pamamagitan ng pag-tap sa kahong icon
                upang ma-drag ang litrato na iyong kinuhanan.)
              </p>
            </div>
          </div> */}

          <div className='howto-content-2'>
            <div>
              <h1>
                STEP 2 <br />
                (PANGALAWANG HAKBANG)
              </h1>
              <p>
                Drag the image you have on the white box container of the
                webpage to be able to scan it by the system.
                <br />
                <br />
                (I-drag ang larawan sa puting kahon na lalagyan ng webpage para
                ito ay ma-scan ng sistema.)
              </p>
            </div>
            <img src={howto3} alt='' />
          </div>

          <div className='howto-content-1'>
            <img src={howto4} alt='' />
            <div>
              <h1>
                STEP 3 <br />
                (PANGATLONG HAKBANG)
              </h1>
              <p>
                Wait for the system to process your request, the result will
                appear beneath the the container.
                <br />
                <br />
                (Hintayin na matapos ng sistema ang proseso, ang resulta ay
                makikita sa ibabang parte ng lalagyan.)
              </p>
            </div>
          </div>
        </div>
      </body>
      <footer>
        <h4>Thesis Capstone</h4>© 2022 CS61
      </footer>
    </>
  )
}

export default LandingPage
