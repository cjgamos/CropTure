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
    }
  }, [])

  return (
    <div className='disease-body'>
      <h1 className='explore-title'> Explore</h1>
      <div className='disease-explore' id='explore'>
        <nav className='list-content' id='list-sticky' ref={ref}>
          <h1 className='list-title'>List</h1>
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
          <h1 className='disease-title'>Diseases</h1>

          <div className='disease-left disease blight' id='blight'>
            <img src={Blight} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Blight</h1>
              <p>
                Plant blight is a common disease. Remember the potato famine in
                the 1840’s? As a result of the blight, one million people died.
                But other than potatoes, blight also affects other plants,
                particularly tomatoes. Blight is a fungal disease that spreads
                through spores that are windborne. For this reason, spores can
                cover large areas and rapidly spread the infection. Blight can
                only spread under warm humid conditions, especially with two
                consecutive days of temps above 50°F, and humidity above 90% for
                eleven hours or more. No cure exists. Prevention is the only
                option.
              </p>
            </div>
          </div>

          <div className='disease-right disease common-rust' id='commonrust'>
            <div className='disease-right-content'>
              <h1 className='right-title'>Common Rust</h1>
              <p>
                Caused by the fungus Puccinia sorghi and occurs every growing
                season. It is seldom a concern in hybrid corn. Rust pustules
                usually first appear in late June. Early symptoms of common rust
                are chlorotic flecks on the leaf surface. These soon develop
                into powdery, brick-red pustules as the spores break through the
                leaf surface. Pustules are oval or elongated, about 1/8 inch
                long, and scattered sparsely or clustered together. The leaf
                tissue around the pustules may become yellow or die, leaving
                lesions of dead tissue.
              </p>
            </div>
            <img src={CommonRust} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease leaf-spot' id='leafspot'>
            <img src={GrayLeafSpot} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Leaf Spot</h1>
              <p>
                Gray leaf spot is typically the most serious foliar disease of
                corn in the U.S. corn belt, although other diseases can be more
                important in areas and years where weather conditions do not
                favor gray leaf spot. Gray leaf spot requires extended periods
                of high humidity and warm conditions. It can be confused with
                other foliar diseases of corn.
              </p>
            </div>
          </div>

          <div className='disease-right disease early-blight' id='earlyblight'>
            <div className='disease-right-content'>
              <h1 className='right-title'>Early Blight</h1>
              <p>
                Early blight is primarily a disease of stressed or senescing
                plants. Symptoms appear first on the oldest foliage. Affected
                leaves develop circular to angular dark brown lesions 0.12 to
                0.16 inch (3–4 mm) in diameter. Concentric rings often form in
                lesions to produce characteristic target-board effect.
              </p>
            </div>
            <img src={EarlyBlight} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease late-blight' id='lateblight'>
            <img src={LateBlight} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Late Blight</h1>
              <p>
                Late blight is caused by the fungal-like oomycete pathogen
                Phytophthora infestans. The primary host is potato, but P.
                infestans also can infect other solanaceous plants, including
                tomatoes, petunias and hairy nightshade. These infected species
                can act as source of inoculum to potato.
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
                These spots are caused by a fungus, usually as a result of
                overwatering your plant. Solution: You may be able to fix this
                by cutting off affected leaves and letting your plant's soil dry
                out. In future, only water when the top two inches of soil feel
                dry.
              </p>
            </div>
            <img src={BacterialLeafBlight} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease brown-spot' id='brownspot'>
            <img src={BrownSpot} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Brown Spot</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                illo aliquid nihil. Cumque provident beatae corporis sequi enim,
                officia nesciunt quia labore ad similique. Architecto sapiente
                dolore beatae labore impedit. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Sed sunt illum cumque fugiat
                praesentium cum inventore numquam perferendis rerum consequatur
                unde laborum, distinctio voluptate vel reprehenderit aliquid!
                Obcaecati, quia nam.
              </p>
            </div>
          </div>

          <div className='disease-right disease leaf-smut' id='leafsmut'>
            <div className='disease-right-content'>
              <h1 className='right-title'>Leaf Smut</h1>
              <p>
                Leaf smut This is a minor fungal disease in which small slightly
                raised black spots develop primarily on the leaves. Raised spots
                or pustules break open releasing air-borne spores. Infection is
                often heavy enough to kill tips of leaves. Leaf smut occurs late
                in the growing season and causes little or no economic loss.
              </p>
            </div>
            <img src={LeafSmut} alt='' className='disease-image' />
          </div>

          <div className='disease-left disease septoria' id='septoria'>
            <img src={Septoria} alt='' className='disease-image' />
            <div className='disease-left-content'>
              <h1 className='left-title'>Septoria</h1>
              <p>
                Septoria are ascomycete pycnidia-producing fungi that cause
                numerous leaf spot diseases on field crops, forages and many
                vegetables including tomatoes which are known to contract
                Septoria musiva from nearby cottonwood trees, and is responsible
                for yield losses.
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
                Bacterial spot of tomato is a potentially devastating disease
                that, in severe cases, can lead to unmarketable fruit and even
                plant death. Bacterial spot can occur wherever tomatoes are
                grown, but is found most frequently in warm, wet climates, as
                well as in greenhouses. The disease is often an issue in
                Wisconsin.
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
