
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/allproperties' element={<AllProperties />}></Route>
          <Route path='/singleproperty' element={<SingleProperty />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )  
}

export default App;



{/*  external link:
        
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"

 */}