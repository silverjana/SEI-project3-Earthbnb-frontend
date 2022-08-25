import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Row, Container } from "react-bootstrap"
import { TextField } from "@mui/material"
import Slider from "@mui/material/Slider"
import TextareaAutosize from "@mui/material/TextareaAutosize"
import Box from "@mui/material/Box"
import { useParams } from "react-router-dom"
import { API_URL } from "../config"



const AddReview = () => {

  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  let { propertyId } = useParams()

  const [data, setData] = useState({
    rating: "",
    title: "",
    text: "",
  })

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [login, setLogin] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
    
    console.log(data)
  }

  //
  const onSubmit = async (event) => {

    event.preventDefault()

    try {
      // API request -> POST req
      const res = await axios.post(`${API_URL}/${propertyId}/review`, data)
      //save the response
      setMessage(res.data.message)
      //WAIT and go to 
      setTimeout(navigate("/userprofile"), 4000)


    } catch (error) {
      console.log(error)

      if (error.response.data.message === "Unauthorized - No token provided") {
        setError("please log in to leave a Review")
        setLogin(true)
      } else {setError(error.response.data.message)}



      //! error on forms
      //helperText={error ? "Incorrect entry" : false}
      //error={error ? true : false }
    }
  }

  // getAriaValueText={data.rating} 

  return (
    <main className='form-page'>
      <Container>
        <Row>
          <form className='form' onSubmit={onSubmit}>
            <h3 className="text-center">Your Review</h3>
            <Box className='submitbox'>
              <div>Rating *</div>
              <Slider aria-label="Rating" defaultValue={1} valueLabelDisplay="auto" step={1} marks min={1} max={5} onChange={handleChange} name="rating" />
              <TextField required className="form-input" id="outlined 1" name="title" label="Title" value={data.title} onChange={handleChange} />
              <TextareaAutosize required className="form-input autosize" id="outlined-required" minRows={2} name="text" placeholder="Text *" value={data.text} onChange={handleChange} />
              {error && <div className="error-mex">{error}</div>}
              {login && <Link className="user-page-btn navigatebtn " as="btn" to="/login" >Go to log in </Link>} 
              <input type="submit" value="Submit review" className='submitbtn' />
              {message && <div className="oksubmit">{message}</div>}
            </Box>
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default AddReview