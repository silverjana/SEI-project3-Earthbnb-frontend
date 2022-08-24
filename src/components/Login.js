import { TextField } from '@mui/material'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const [data, setData] = useState({
    userName: "",
    password: "",
  })

  const navigate = useNavigate()

  const [error, setError] = useState('')

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
  }

  //
  const onSubmit = async (event) => {

    event.preventDefault()

    try {
      // API request -> POST req to login
      const res = await axios.post("https://project3-earthbnb.herokuapp.com/login", data)
      //setError(null)
      //token is the response
      const { token } = res.data
      //set in local storage
      localStorage.setItem("EarthBnbToken", token)
      //put token in header for all requests, with bearer
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      //go to 
      navigate("/userprofile")

    } catch (error) {
      console.log(error)

      setError(error.response.data.message)

      //! error on forms
      //helperText={error ? "Incorrect entry" : false}
      //error={error ? true : false }
      
    }
  }

  return (
    <main className='form-page'>
      <Container>
        <Row>
          <form className='form' onSubmit={onSubmit}>
            <h3 className="text-center">Login</h3>
            <TextField error={error ? true : false } required className="form-input" id="outlined-required" name='userName' label="Username" value={data.userName} onChange={handleChange} />
            <TextField error={error ? true : false } required className="form-input" id="outlined-password-input" type="password" name='password' label="Password" value={data.password} onChange={handleChange} />
            {error && <div className='error-mex'>{error}</div>}
            <input type="submit" value="Login" className='submitbtn-fixed'/>
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default Login