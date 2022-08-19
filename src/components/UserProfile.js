import { Link } from "react-router-dom"

const userProfile = () => {
  return (
    <>
      <h1>this is a user profile page</h1>
      <Link className="user-page-btn" as="btn" to="/" >Back to Home</Link>
    </>
  )
}

export default userProfile