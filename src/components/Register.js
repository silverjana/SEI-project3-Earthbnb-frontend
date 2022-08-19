//! Imports
import { TextField } from "@mui/material"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"


const Register = () => {
  return (
    <main className="form-page">
      <Container>
        <Row>
          <form className="form">
            <h3 className="text-center">Register</h3>
            {/* add value={formData.username; .email; .password; .passwordConfirmation} */}
            <TextField required className="form-input" id="outlined-required" name='username' label="Username"/>
            <TextField required className="form-input" id="outlined-required" name='email' label="Email"/>
            <TextField required className="form-input" id="outlined-password-input" type="password" name='password' label="Password"/>
            <TextField required className="form-input" id="outlined-password-input" type="password" name='passwordConfirmation' label="Confirm Password"/>
            <input type="submit" value="Register" className='btn dark w-100' />
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default Register