import React, { useRef, useEffect } from "react"

import "../css/Disease.css"

import Blight from "../img/BLIGHT-orig.png"
import CommonRust from "../img/COMMON RUST-orig.png"
import GrayLeafSpot from "../img/LEAF SPOT-orig.png"
import EarlyBlight from "../img/TOMATO EARLY BLIGHT-orig.png"
import LateBlight from "../img/TOMATO LATE BLIGHT-orig.png"
import BacterialLeafBlight from "../img/Rice bacterial leaf blight-orig.png"
import BrownSpot from "../img/Rice Brown spot-orig.png"
import LeafSmut from "../img/Rice Leaf smut-orig.png"
import BacterialSpot from "../img/Tomato Bacterial Spot-orig.png"
import Septoria from "../img/Septoria-orig.png"

function Disease() {
  const ref = useRef(null)
  const des = useRef(null)

  useEffect(() => {
    let stickyElem = ref.current
    let currStickyPos
    let diseaseElem = des.current
    let explore = document.querySelector("#explore")

    currStickyPos = stickyElem.getBoundingClientRect().top + window.pageYOffset
    window.onscroll = function () {
      if (window.screen.width > 1175) {
        if (window.pageYOffset > currStickyPos) {
          stickyElem.style.position = "fixed"
          stickyElem.style.top = "0px"
          diseaseElem.style.position = "relative"
          diseaseElem.style.float = "right"
          explore.style.display = "block"
        } else {
          stickyElem.style.position = "relative"
          stickyElem.style.top = "initial"
          explore.style.display = "flex"
        }
      } else {
        console.log("Easter Egg")
      }
    }
  }, [])

  return (
    <div className='disease-body'>
      {/* <h1 className='explore-title'> Explore</h1> */}
      <div className='disease-explore' id='explore'>
        <nav className='list-content' id='list-sticky' ref={ref}>
          <h1 className='list-title'>Common Diseases</h1>
          <ul className='list-content-link'>
            <li>
              <a href='#blight'>Blight</a>
            </li>
            <li>
              <a href='#commonrust'>Common Rust</a>
            </li>
            <li>
              <a href='#leafspot'>Gray Leaf Spot</a>
            </li>
            <li>
              <a href='#earlyblight'>Early Blight</a>
            </li>
            <li>
              <a href='#lateblight'>Late Blight</a>
            </li>
            <li>
              <a href='#bacterialleafblight'>Bacterial Leaf Blight</a>
            </li>
            <li>
              <a href='#brownspot'>Brown Spot</a>
            </li>
            <li>
              <a href='#leafsmut'>Leaf Smut</a>
            </li>
            <li>
              <a href='#septoria'>Septoria</a>
            </li>
            <li>
              <a href='#bacterialspot'>Bacterial Spot</a>
            </li>
          </ul>
        </nav>

        <div className='disease-content' ref={des}>
          {/* <h1 className='disease-title'>Diseases</h1> */}

          <div className='disease-left disease blight' id='blight'>
            <img src={Blight} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Blight</h1>
              <p>
                Plant blight is a widespread disease. Remember the potato famine
                of the 1930s? the 1840’s? One million people died as a result of
                the blight. However, blight affects plants other than potatoes.
                Especially tomatoes. Blight is a contagious fungal disease. by
                means of windborne spores As a result, spores can Cover a large
                area and spread the infection quickly. Blight can occur. only
                spreads in warm, humid conditions, particularly with two
                consecutive days with temperatures above 50°F and humidity
                levels above 90% for eleven or more hours There is no cure.
                Prevention is the only option. option.
              </p>
            </div>
          </div>

          <div className='disease-right disease common-rust' id='commonrust'>
            <div className='disease-right-content'>
              <h1 className='right-title'>Common Rust</h1>
              <p>
                Every growing season, caused by the fungus Puccinia sorghi.
                season. It is rarely an issue in hybrid corn. Pustules of rust
                Typically, they first appear in late June. Early signs of common
                rust are chlorotic flecks on the surface of the leaf These
                emerge quickly. As the spores break through the skin, they turn
                into powdery, brick-red pustules. surface of the leaf Pustules
                are about 1/8 inch long and oval or elongated. long, and
                sparsely scattered or clustered together The plant's leaf The
                tissue surrounding the pustules may turn yellow or die, leaving
                a scar. Dead tissue lesions
              </p>
            </div>
            <img src={CommonRust} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease leaf-spot' id='leafspot'>
            <img src={GrayLeafSpot} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Leaf Spot</h1>
              <p>
                Gray leaf spot is the most serious foliar disease. Although
                other diseases can be more severe. Gray leaf spot usually
                requires prolonged treatment. of high humidity and warm
                temperatures It is similar to but not the same as other corn
                fungicide diseases.
              </p>
            </div>
          </div>

          <div className='disease-right disease early-blight' id='earlyblight'>
            <div className='disease-right-content'>
              <h1 className='right-title'>Early Blight</h1>
              <p>
                Early blight is primarily a stress or aging disease. plants.
                Symptoms first appear on the oldest foliage. Affected Lesions on
                the leaves range from circular to angular and are dark brown in
                color. The diameter is 0.16 inch (3-4 mm). Concentric rings
                frequently form in lesions to produce the typical target-board
                effect
              </p>
            </div>
            <img src={EarlyBlight} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease late-blight' id='lateblight'>
            <img src={LateBlight} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Late Blight</h1>
              <p>
                The pathogen responsible for late blight is a fungal-like
                oomycete. Infestans Phytophthora Potato is the primary host, but
                P. Infestans can also infect other solanaceous plants, such as
                Hairy nightshade, tomatoes, and petunias These infected animals
                can serve as a source of inoculum for potatoes
              </p>
            </div>
          </div>

          <div
            className='disease-right disease bacterial-leaf-blight'
            id='bacterialleafblight'
          >
            <div className='disease-right-content'>
              <h1 className='right-title'>Bacterial Leaf Blight</h1>
              <p>
                These spots are caused by a fungus, and they usually appear as a
                result of You are overwatering your plant. You might be able to
                fix this. by removing affected leaves and allowing your plant's
                soil to dry out. Only water when the top two inches of soil feel
                dry in the future. dry.
              </p>
            </div>
            <img src={BacterialLeafBlight} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease brown-spot' id='brownspot'>
            <img src={BrownSpot} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Brown Spot</h1>
              <p>
                Brown spot is a fungal disease affecting coleoptiles, leaves,
                leaf sheath, panicle branches, glumes and spikelets. The most
                noticeable damage is the numerous large spots on the leaves,
                which can kill the entire leaf. When infection occurs in the
                seed, unfilled kernels or spotted or discolored seeds are
                formed.
              </p>
            </div>
          </div>

          <div className='disease-right disease leaf-smut' id='leafsmut'>
            <div className='disease-right-content'>
              <h1 className='right-title'>Leaf Smut</h1>
              <p>
                Leaf smut is a minor fungal disease caused by small slightly
                Raised black spots appear mostly on the leaves. Raised areas or
                pustules burst, releasing airborne spores Infection is a
                disease. It is frequently heavy enough to kill the tips of
                leaves. Late leaf smut occurs. During the growing season, there
                is little or no economic loss.
              </p>
            </div>
            <img src={LeafSmut} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease septoria' id='septoria'>
            <img src={Septoria} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Septoria</h1>
              <p>
                Septoria are pycnidia-producing ascomycete fungi that cause many
                leaf spot diseases on field crops, forages, and other crops
                vegetables, such as tomatoes, are known to contract Septoria
                musiva is found in nearby cottonwood trees and is responsible
                for because of yield losses
              </p>
            </div>
          </div>

          <div
            className='disease-right disease bacterial-spot'
            id='bacterialspot'
          >
            <div className='disease-right-content'>
              <h1 className='right-title'>Bacterial Spot</h1>
              <p>
                Tomato bacterial spot is a potentially lethal disease. which, in
                extreme cases, can result in unmarketable fruit and even Plant
                demise Bacterial spot can occur anywhere tomatoes are grown.
                grown, but it is most common in warm, wet climates, as as well
                as greenhouse.
              </p>
            </div>
            <img src={BacterialSpot} alt='' className='disease-image' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disease
