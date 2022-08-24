import { Link } from "react-router-dom"


const AddReview = () => {
  return (

    <>
      <h1>You can add a review here</h1>
      {/* add button to go back */}
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </>
  )
}

export default AddReview