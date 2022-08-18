import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="home-container">
      <main className="hero text-center">
        <h1>Earth BnB</h1>
        <p className='lead'>Plan you next sustainable holiday by choosing our green properties</p>
        <Link className="btn" to='/allproperties'>Find your next Holiday</Link>
      </main>
    </div>
  )
}

export default Landing