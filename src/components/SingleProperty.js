import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ReviewContainer from './ReviewContainer';
import { useLocation } from "react-router-dom"
import PropertyHeading from "./PropertyHeading"

const SingleProperty = () => {

  const { id } = useParams()
  const [ property, setProperty ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/properties/${id}`)
        setProperty(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [id]) 

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  console.log(property)
  return (
    <Container as='main'>
      { property ?
        <>
          <PropertyHeading images={property.images} name={property.name}/>
          <Row>
            <section className="description-container">
              <h3 className='descript-heading'>Description:</h3>
              <p className='description-para'>{property.description}</p>
            </section>
          </Row>
          <Row>
            <section className="amenities-container">
              <h3 className="amenities-heading">Amenities:</h3>
              <p className="amenities-para">{property.amenities.map((amenity, idx) => {
                return ( <div key={idx}>{amenity}</div>)
              })}</p>
            </section>
          </Row>

          { property.reviews.length > 0 ?
          <ReviewContainer reviews={property.reviews}/>
          :
          <div className="review-container">
            <h3 className="review-heading">Reviews:</h3>
            <p className="review-para">There are no reviews for this property</p>
          </div>
          }

        </>
        :
        <h2>
          { errors ? 'Something went wrong, Please try again Later' : 'Loading...'}
        </h2>
        
      }
    </Container>
  )
}

export default SingleProperty