import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup/Signup'
import SignIn from './components/Signup/SignIn'
import Todo from './components/Todo/Todo'
import { useDispatch } from 'react-redux'
import { authActions } from './store'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   const id = sessionStorage.getItem("id");
   if (id) {
    dispatch(authActions.login())
   }

   
  }, [])
  
  return (
    <div>
      <Router>
      <Navbar/>

        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about-us' element={<About/>}/>
          <Route exact path='/todo' element={<Todo/>}/>
          <Route exact path='/signin' element={<SignIn/>}/>
          <Route exact path='/signup' element={<Signup/>}/>


        </Routes>
      </Router>
      {/* <About/> */}
      {/* <Home/> */}
    </div>
  )
}

export default App