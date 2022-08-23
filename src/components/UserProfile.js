import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { Row, Col, Container, Card } from "react-bootstrap"

const UserProfile = () => {
  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  //get all properties
  const [userData, setUserData] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/user-profile`)
        setUserData(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getData()
  }, [])

  const {userName,  myProperties, myReviews } = userData

 

  // //get properties with his id in createdby
  // const [hasProperties, setHasProperties] = useState('')
  // const [properties, setProperties] = useState('')


  // useEffect(() => {
  //   const getProperties = async () => {
  //     try {
  //       const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/all-properties`)
  //       setHasProperties(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getProperties()
  // }, [])

  // if (hasProperties) {
  //   setProperties(hasProperties.filter(property => {
  //     return property.createdBy === _id
  //   }))
  // }



  return (
    <>
      {error && <div className='error-mex'>{error}</div>}
      <h1>Welcome {userName}!</h1>

      {/* map trough the properties to display a preview and a link to the single property page -> use id  */}

      <Container as='main'>
      <Row>
      <h3>Your properties:</h3>
        {myProperties
        ?
        
        myProperties.map(property => {
          const { _id, name, type, price, images } = property
          return (
            <Col key={_id} md='4' className="mb-5">
              <Link to={`/properties/${_id}`}>
                <Card className="property-card">
                  <Card.Body>
                    <img className="prop-car-img"  src={images[0]} alt={name}/>
                    <Card.Title className="card-title">{name}, {type} - {price}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )
        })
      :
      <Link className="user-page-btn" as="btn" to="/add-property" >add a property</Link>
      }

      </Row>
    </Container>

    <Container as='main'>
      <Row>
      <h3>Your reviews:</h3>
        {myReviews
        ?
        
        myReviews.map(property => {
          const { _id, name, type, price, images } = property
          return (
            <Col key={_id} md='4' className="mb-5">
              <Link to={`/properties/${_id}`}>
                <Card className="property-card">
                  <Card.Body>
                    <img className="prop-car-img"  src={images[0]} alt={name}/>
                    <Card.Title className="card-title">{name}, {type} - {price}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )
        })
      :
      <Link className="user-page-btn" as="btn" to="/add-property" >add a property</Link>
      }

      </Row>
    </Container>




      <Link className="user-page-btn" as="btn" to="/" >Back to Home</Link>
    </>
  )
}

export default UserProfile