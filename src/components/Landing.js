import { Link } from 'react-router-dom'
import Cityimage from '../images/singapore-city.jpeg'
import Countryimage from '../images/countryside-homepage.jpeg'
import Islandimage from '../images/thailand-island.jpeg'
import { Carousel } from 'react-bootstrap'

const Landing = () => {

  const homeCarousel = [Cityimage, Countryimage, Islandimage]

  return (
    <div className="home-container">
      <main className="hero text-center">
        <h1 className='landing-title'>EarthBnB</h1>
        <p className='lead'>Plan you next sustainable holiday by choosing our green properties</p>
        <Carousel className='carousel-all'>
        {homeCarousel.map(image => {
          return (
            <Carousel.Item interval={(1000) * 8} key={image} >
              <img className="carousel-image" loading="lazy" src={image} alt='city'/>
              <Carousel.Caption>
                <button className='btn-homepage'><Link to='/all-properties'>Find your next Holiday</Link></button>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
        </Carousel>
        {/* </div> */}
      </main>
    </div>
  )
}

export default Landing
