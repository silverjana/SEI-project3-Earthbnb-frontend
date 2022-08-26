import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { Row, Col, Container, Card, Carousel } from "react-bootstrap"
import { Box } from "@mui/system"
import { LinearProgress } from "@mui/material"
import { API_URL } from "../config"
import { Modal, Button } from "react-bootstrap";

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
        const { data } = await axios.get(`${API_URL}/user-profile`)
        setUserData(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getData()
  }, [])

  const { userName, reviews, myProperties } = userData
  console.log(myProperties, reviews, userName)

  const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, type, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(type, id) }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

  const handleDelete = async (propertyId, reviewId) => {
    try {
      console.log({propertyId}, {reviewId})
      const deleteReview = await axios.delete(`${API_URL}/properties/${propertyId}/reviews/${reviewId}`)
      console.log('button clicked to delete review ->', deleteReview)

      // Reload component 
      function refreshPage() {
        window.location.reload();
      }
      refreshPage()

    } catch (error) {
      console.log(error)
    }
  }
//adding delete property

  const handleDeleteProperty = async (propertyId) => {
    try {
      const deleteProperty = await axios.delete(`${API_URL}/properties/${propertyId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        myProperties && reviews ?
          <>
            <h1>Welcome <span>{userName}</span>!</h1>
            <Container as='main' className="user-property ">
              <Row>
                <h3>Your properties:</h3>

                {myProperties.length > 0
                  ?
                  myProperties.map(property => {
                    const { _id, name, type, price, images } = property
                    console.log(_id)
                    return (
                      <Col key={_id} md='4' className="mb-5">
                        
                          <Card className="property-card">
                          <Card.Body>
                          <Link to={`/properties/${_id}`}>
                      <Carousel className='carousel' interval={null} variant='top'>
                        {images.map((image, idx) => {
                          return (
                            <Carousel.Item key={idx}>
                              <img className="prop-car-img" loading="lazy" src={image} alt={name} />
                            </Carousel.Item>
                          )
                        })}
                      </Carousel>
                      <Card.Title className="card-title">{name}</Card.Title>
                      <Card.Text className="card-text">ppn/£{price}</Card.Text>
                      </Link>

                      <button className="user-page-btn delete-review" onClick={() => handleDeleteProperty(_id)}>Delete This Property</button>
                    </Card.Body>
                          </Card>
                      
                      </Col>
                    )
                  })
                  :
                  <div className="spaced">You don't have any properties listed</div>
                }
                <div>
                <Link className="user-page-btn navigatebtn-spaced" as="btn" to="/add-property" >Add a property</Link>
                </div>
              </Row>
            </Container>

            <Container as='main'>
              <Row className="mt-5">
                <h3>Your reviews:</h3>
                {reviews.length > 0
                  ?
                  reviews.map(review => {
                    const { _id, title, text, rating, propertyId } = review
                    return (
                      <Col key={_id} md='6' className="mb-5">
                        <Card className="review-card">
                          <Card.Body >
                            <Card.Title className="card-title">{'⭐️'.repeat(rating)} - {title}</Card.Title>
                            <Card.Text>{text}
                              <br /><br />
                              {propertyId && <>
                                <Link className="user-page-btn navigatebtn-spaced" as="link" to={`/properties/${propertyId}`}>Visit the Property</Link>
                                <Link className="user-page-btn navigatebtn-spaced" as="link" to={`/review-update/${propertyId}/${_id}/`}>Edit the Review</Link>
                              </>}
                            </Card.Text>
                            <button className="user-page-btn delete-review" onClick={() => handleDelete(propertyId, _id)}>Delete This Review</button> 
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })
                  :
                  <div>No reviews yet</div>
                }
              </Row>
            </Container>
          </>
          :
          <>
            {error ?
              <Box className="errorbox">
                {/* <div className='error-mex'>{error}</div>  */}
                <h2>Please log in to see your profile</h2>
                <Link className="user-page-btn navigatebtn " as="btn" to="/login" >Go to log in </Link>
                < br />
              </Box>
              :
              <div className="loading-bar"> <br /> <LinearProgress color="success" /> </div>}
          </>
      }
      {/* <Link className="user-page-btn navigatebtn" as="btn" to="/" >Back to Home</Link> */}
    </>
  )
}


export default UserProfile