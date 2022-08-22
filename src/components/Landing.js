import { Link } from 'react-router-dom'
import Cityimage from '../images/singapore-city.jpeg'
import Countryimage from '../images/countryside-homepage.jpeg'
import Islandimage from '../images/thailand-island.jpeg'
import { Carousel } from 'react-bootstrap'


const Landing = () => {
  return (
    <div className="home-container">
      <main className="hero text-center">
        <h1>Earth BnB</h1>
        <p className='lead'>Plan you next sustainable holiday by choosing our green properties</p>
        <Carousel className='carousel'>
          <Carousel.Item interval={(1000) * 8}>
            <img className="carousel-image"  src={Cityimage} alt='city'/>
            <Carousel.Caption>
              <button className='btn-homepage'>Head to the City</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={(1000) * 8}>
          <img className="carousel-image" src={Countryimage} alt='country'/>
            <Carousel.Caption>
            <button className='btn-homepage'>Escape to the Country</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={(1000) * 8}>
          <img className="carousel-image" src={Islandimage} alt='island'/>
            <Carousel.Caption>
            <button className='btn-homepage'>Pop to an Island</button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
          <Link className="btn" to='/allproperties'>Find your next Holiday</Link>
        {/* </div> */}
      </main>
    </div>
  )
}


export default Landing
