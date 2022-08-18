import { Link } from "react-router-dom"

const AddProperty = () => {
  return (
      <>
      <h1>You can add a property here</h1>
      {/* add button to go back */}
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </>
  )
}

export default AddProperty