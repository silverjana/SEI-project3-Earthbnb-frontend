import { TextField } from '@mui/material'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


//add handle changes 
//and onclick 
const Login = () => {
  return (
    <main className='form-page'>
      <Container>
        <Row>
          <form className='form'>
            <h3 className="text-center">Login</h3>
            <TextField required className="form-input" id="outlined-required" name='email' label="Email"/>
            <TextField required className="form-input" id="outlined-password-input" type="password" name='password' label="Password"/>
            <input type="submit" value="Login" className='btn dark w-100'/>
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default Login