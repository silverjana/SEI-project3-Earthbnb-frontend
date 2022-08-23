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
        console.log(property.name)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id]) 

  console.log(id)
  return (
        <h1>hello</h1>
    
  )
}

export default SingleProperty