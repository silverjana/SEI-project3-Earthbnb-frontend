import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { useEffect } from "react"
import Uploading from "./Uploading.js";
import { Box } from "@mui/system";


const AddProperty = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const [data, setData] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    images: ""
  })

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [pwError, setPwError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [userError, setUserError] = useState('')

  //update data with each change
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    //reset error
    setError('')
    setPwError('')
    setEmailError('')
    setUserError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      // API request -> POST req to login
      await axios.post("https://project3-earthbnb.herokuapp.com/add-property", data)
      //setError(null)
      //go to 
      navigate("/userprofile")

    } catch (error) {
      console.log(error)

      setError(error.response.data.message)

      if (error.response.data.message === 'Passwords do not match.') {
        setPwError('yep')
      }
      if (error.response.data.message === "User with this email already exists") {
        setEmailError('yep')
      }
      if (error.response.data.message === "User with this username already exists") {
        setUserError('yep')
      }


    }

    
  }

  
 
  return (
    <main className="form-page">
      <Container>
        <Row>
          <form className="form" onSubmit={onSubmit}>
            <h3 className="text-center">Add Property</h3>
            {/* add value={formData.username; .email; .password; .passwordConfirmation} */}
            <Box className="submitbox">
            <TextField required error={userError ? true : false} className="form-input" id="outlined-required" name='name' label="Property Name" value={data.name} onChange={handleChange} />
            <div className="select-property-type">
              <select className="type-select" name='type' onChange={handleChange}>
                  <option selected={true} disabled value='All'>Choose type</option>
                  <option value='cabin'>Cabins</option>
                  <option value='city'>City</option>
                  <option value='country'>Country</option>
                  <option value='camping'>Camp</option>
                  <option value='beach'>Beach</option>
              </select>
            </div>
            <TextField required error={userError ? true : false} className="form-input" id="outlined-textarea" name='description' label="Description" value={data.description} onChange={handleChange} multiline />

            <TextField required error={userError ? true : false} className="form-input" id="outlined-required" name='price' label="price" value={data.price} onChange={handleChange} />

            <TextField required error={userError ? true : false} className="form-input" id="outlined-required" name='amenities' label="Amenities" value={data.amenities} onChange={handleChange} />
            
            <Uploading name='images' setData={setData} data={data}/>
          
            {error && <div className='error-mex'>{error}</div>}
            <input type="submit" value="Submit" className='btn submitbtn' />
            </Box>
          </form>
        </Row>
       
      </Container>
    </main>
  )
}

export default AddProperty