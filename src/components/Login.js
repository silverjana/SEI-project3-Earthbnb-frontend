
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {
  return (
    <main className='form-page'>
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-6 offset-md-3'>
            <h3 className="text-center">Login</h3>
            <input type="email" name="email" placeholder="Email"></input>
            <input type="password" name="password" placeholder="password"></input>
          </form>
        </Row>
      </Container>
    </main>
  )
}
export default Login