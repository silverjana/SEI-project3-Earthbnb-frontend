import { useState, useEffect } from "react"
import axios from "axios"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom"
import { Carousel } from "react-bootstrap"
import { LinearProgress } from "@mui/material"
import { API_URL } from "../config"

const AllProperties = () => {

  const [allProps, setAllProps] = useState([])
  const [filterProperty, setFilterProperty] = useState({
    type: 'All'
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/all-properties`)
        setAllProps(data)

      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleChange = (e) => {
    const propertyTypes = allProps.filter(property => property.type === e.target.value)
    setFilterProperty(propertyTypes)
  }

  return (
    <Container as='main'>
      <div className="filter-div">
        <select className="type-select-all" name='type' onChange={handleChange}>
          <option value='All'>All Properties</option>
          <option value='cabin'>Cabins</option>
          <option value='city'>City</option>
          <option value='country'>Country</option>
          <option value='camping'>Camping</option>
          <option value='beach'>Beach</option>
        </select>
      </div>
      <Row>
        {(filterProperty.length > 0 ? filterProperty : allProps).map(property => {
          const { _id, name, price, images } = property

          return (
            <Col key={_id} md='4' className="column-allProp" mb="5">
              {name ?
                <Link to={`/properties/${_id}`}>
                  <Card className="property-card">
                    <Card.Body>
                      <Carousel className='carousel' interval={null} variant='top'>
                        {images.map((image, idx) => {
                          return (
                            <Carousel.Item key={idx}>
                              <img className="prop-car-img" loading="lazy" src={image} alt={name}/>
                            </Carousel.Item>
                          )
                        })}
                      </Carousel>
                      <Card.Title className="card-title">{name}</Card.Title>
                      <Card.Text className="card-text">ppn/£{price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
                :
                <div className="loading-bar"> <br /> <LinearProgress color="success" /> </div>
              }
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default AllProperties