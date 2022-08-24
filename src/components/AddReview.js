import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { Row, Container } from "react-bootstrap"
import { TextField } from "@mui/material"
import Slider from "@mui/material/Slider"
import TextareaAutosize from "@mui/material/TextareaAutosize"
import Box from "@mui/material/Box"


const AddReview = () => {

  const [data, setData] = useState({
    rating:"",
    title: "",
    text: "",
  })

  const navigate = useNavigate()

  const [error, setError] = useState('')

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
      const res = await axios.post("https://project3-earthbnb.herokuapp.com/add-property", data)
      //setError(null)
      //save the response
      const { message, createdReview } = res.data
      //go to 
      navigate("/user-profile")

    } catch (error) {
      console.log(error)

      setError(error.response.data.message)

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
            <Slider aria-label="Rating" defaultValue={3} valueLabelDisplay="auto" step={1} marks min={1} max={5} onChange={handleChange} name="rating" />
            
            <TextField  required className="form-input" id="outlined 1" name="title" label="Title" value={data.title} onChange={handleChange} />
            <TextareaAutosize  required className="form-input autosize" id="outlined-required" minRows={2}  name="text" placeholder="Text" value={data.text} onChange={handleChange} />
            {error && <div className="error-mex">{error}</div>}
            <input type="submit" value="Submit review" className='submitbtn'/>
            </Box>
          </form>
        </Row>
      </Container>
    </main>
  )



  // return (

  //   <>
  //     <h1>You can add a review here</h1>
  //     {/* add button to go back */}
  //     <Link to="/">
  //       <button>Back to Home</button>
  //     </Link>
  //   </>
  // )
}

export default AddReview