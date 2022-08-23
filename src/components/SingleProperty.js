import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SingleProperty = () => {

  const { id } = useParams()
  const [ property, setProperty ] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/properties/${id}`)
        setProperty(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, []) 

  console.log(id)
  return (
    property ? 
        <h1>{property.name}</h1>
        :
        <h1>Loading</h1>
    
  )
}

export default SingleProperty