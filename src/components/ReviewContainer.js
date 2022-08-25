import Row from 'react-bootstrap/Row'


const ReviewContainer = ({reviews}) => {
    return (
        <Row>
            <section className="review-container">
              <h3 className="review-heading">Reviews:</h3>
              <p className="review-para">
                {reviews.map(review => {
                    const { title, text, rating } = review
                    return (
                            <>
                            <div className='review-rating'>{'⭐️'.repeat(rating)}</div>
                            <div className='review-title'>{title}</div>
                            <div className='review-text'>{text}</div>
                          </>  
                    )
                })}
              </p>
              
            </section>
          </Row>
          )
}

export default ReviewContainer;