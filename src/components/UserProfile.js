import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

const UserProfile = () => {
  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  //get all properties
  const [user, setUser] = useState('')
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/user-profile`)
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const { _id, userName, } = user

  //get properties with his id in createdby
  const [hasProperties, setHasProperties] = useState('')
  const [properties, setProperties] = useState('')


  useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/all-properties`)
        setHasProperties(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProperties()
  }, [])

  if (hasProperties) {
    setProperties(hasProperties.filter(property => {
      return property.createdBy === _id
    }))
  }



  return (
    <>
      <h1>Welcome {userName}!</h1>
      {!properties && <Link className="user-page-btn" as="btn" to="/addproperty" >add a property</Link>}
      {/* map trough the properties to display a preview and a link to the single property page -> use id  */}
      <Link className="user-page-btn" as="btn" to="/" >Back to Home</Link>
    </>
  )
}

export default UserProfile