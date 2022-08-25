import { Col, Row } from "react-bootstrap"

const PropertyHeading = ({images, name}) => {
  return (
    <Row>
      <h1 className="property-heading">{name}</h1>
      <div className="image-container">
        <Col md='6'><img className="large-img" src={images[0]} alt={name}/></Col>
        <Col md='6' mb='4' className='multi-images'>
        {images.map((image, idx) => {
            if(idx > 0){
              return (
                  <img key={idx} className="indiv-img" src={image} alt={name}/>
              )
            }
          })}
          </Col>
      </div>
    </Row>
  )
}

export default PropertyHeading