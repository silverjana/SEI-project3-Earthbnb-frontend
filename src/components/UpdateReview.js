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



const UpdateReview = () => {

  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  let { propertyId, reviewId } = useParams()

  const [data, setData] = useState({
    rating: "",
    title: "",
    text: "",
  })

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [message, setMessage] = useState("")
  const [reviews, setReviews] = useState("")

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
    console.log(data)
  }

  //!get old revierw data

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://project3-earthbnb.herokuapp.com/user-profile`)
        setReviews(data.user.reviews)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getData()
  }, [])

  setReviews(reviews.filter(review => review.createdBy = reviewId))
  console.log(reviews)

  setData(...reviews)
  (console.log(data))

  
  
  const onSubmit = async (event) => {

    event.preventDefault()

    try {
      // API request -> POST req
      const res = await axios.put(`https://project3-earthbnb.herokuapp.com/properties/${propertyId}/${reviewId}`, data)
      setError("")
      //save the response
      setMessage(res.data.message)
      console.log(res.data)
      //WAIT and go to 
      setTimeout(navigate("/userprofile"), 4000)


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
            <h3 className="text-center">Update your review</h3>
            <Box className='submitbox'>
              <div>Rating *</div>
              <Slider aria-label="Rating" defaultValue={data.rating} valueLabelDisplay="auto" step={1} marks min={1} max={5} onChange={handleChange} name="rating" />
              <TextField required className="form-input" id="outlined 1" name="title" label="Title" value={data.title} onChange={handleChange} />
              <TextareaAutosize required className="form-input autosize" id="outlined-required" minRows={2} name="text" placeholder="Text *" value={data.text} onChange={handleChange} />
              {error && <div className="error-mex">{error}</div>}
              <input type="submit" value="Update" className='submitbtn' />
              {{ message } && <div className="oksubmit">{message}</div>}
            </Box>
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default UpdateReview