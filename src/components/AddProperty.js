import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';


const AddProperty = () => {

  const [data, setData] = useState({
    name: "",
    description: "",
    type: "",
    confirmPassword: "",
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
            <TextField required error={userError ? true : false} className="form-input" id="outlined-required" name='name' label="Property Name" value={data.name} onChange={handleChange} />
            <TextField required error={userError ? true : false} className="form-input" id="outlined-textarea" name='description' label="Description" value={data.description} onChange={handleChange} multiline />
            <h6 className="text-center">please select one</h6>
            {['radio'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`beach`}
            name="group1"
            value={data.type}
            onChange={handleChange}
          />
           <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`cabin`}
            name="group1"
            value={data.type}
            onChange={handleChange}
          />
           <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`country`}
            name="group1"
            value={data.type}
            onChange={handleChange}
          />
           <Form.Check 
            type={type}
            id={`default-${type}`}
            label={`city`}
            name="group1"
            value={data.type}
            onChange={handleChange}
          />
        </div>
        
      ))}
            <TextField required error={userError ? true : false} className="form-input" id="outlined-required" name='price' label="price" value={data.price} onChange={handleChange} />
            <TextField required error={userError ? true : false} className="form-input" id="outlined-required" name='country' label="country" value={data.country} onChange={handleChange} />
            <TextField required error={userError ? true : false} className="form-input" id="outlined-required" name='postcode' label="postcode" value={data.postcode} onChange={handleChange} />
            {error && <div className='error-mex'>{error}</div>}
            <input type="submit" value="Submit" className='btn dark w-100' />
          </form>
        </Row>
      </Container>
    </main>
  )
}

export default AddProperty