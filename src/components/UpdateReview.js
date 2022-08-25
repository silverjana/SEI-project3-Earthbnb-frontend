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



const UpdateReview = () => {

  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  let { propertyId, reviewId } = useParams()

  const [data, setData] = useState({
    rating: 0,
    title: "",
    text: "",
  })

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [oldData, setOldData] = useState(null)

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    setError('')
    console.log("handlechange data: ", data)
  }

  //!get old review data

  useEffect(() => {
    const getData = async () => {
      try {
        console.log({ propertyId }, { reviewId })
        const { data } = await axios.get(`${API_URL}/user/${reviewId}`)
        setOldData(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getData()
  }, [])

useEffect(() => {
  async function setplaceholder() {
    //console.log("old data", oldData)
    const { oldReview } =  await oldData
    console.log(oldReview)
    const {title, text, rating } = await oldReview
    console.log(title)
    setData({rating, title, text})
  }
  setplaceholder();
}, [oldData] )


  //setData({rating, title, text})

  

  //setData({oldReview})

  //setData with the old review spread -> is the value/shows in text fields

  const onSubmit = async (event) => {

    event.preventDefault()

    try {
      // API request -> POST req
      const res = await axios.put(`${API_URL}/properties/${propertyId}/reviews/${reviewId}`, data)
      setError("")
      //save the response
      setMessage(res.data.message)
      console.log("submit res ", res.data)
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
              <Slider aria-label="Rating" defaultValue={5} valueLabelDisplay="auto" step={1} marks min={0} max={5} onChange={handleChange} name="rating" value={data.rating? data.rating : 5}/>
              <TextField required className="form-input" id="outlined 1" name="title" label="Title" value={data.title} onChange={handleChange} />
              <TextareaAutosize required className="form-input autosize" id="outlined-required" minRows={2} name="text" placeholder="Text *" value={data.text} onChange={handleChange} />
              {error && <div className="error-mex">{error}</div>}
              <input type="submit" value="Update" className='submitbtn' />
              {message && <div className="oksubmit">{message}</div>}
            </Box>
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default UpdateReview