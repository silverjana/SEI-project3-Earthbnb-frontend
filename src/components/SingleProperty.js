import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SingleProperty = () => {

  const { id } = useParams()
  const [ property, setProperty ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/properties/${id}`)
        setProperty(data)
        console.log(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [id]) 

  const imageOne = []
  
  console.log(id)

  return (
    <Container as='main'>
      { property ?
        <Row> 
          <>
            <h1 className="property-heading">{property.name}</h1>
            <div className="image-container">
                {property.images.map(image => {
                  return (
                      <img className="indiv-img"src={image} alt={property.name}/>
                  )
                })}
            </div>
          </>
        </Row>
      :
      <h2>
        { errors ? 'Something went wrong, Please try again Later' : 'Loading...'}
      </h2>
      }
    </Container>
    
  )
}

export default SingleProperty