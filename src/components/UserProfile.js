import { Link } from "react-router-dom"

const userProfile = () => {
  return (
    <>
      <h1>this is a user profile page</h1>
      {/* add button to go back */}
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </>
  )
}

export default userProfile