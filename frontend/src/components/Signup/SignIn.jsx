import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import HeadingComp from './HeadingComp'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Input, setInput] = useState({ email: "", password: "" })
  const change=(e)=>{
    const {name,value} = e.target;
    setInput({...Input,[name]:value})
  }

  const submit = async(e) => {
   e.preventDefault();
    await axios.post('http://localhost:1000/api/v1/sign-in',Input).then((response)=>{
      // console.log(response.data.others._id);
      sessionStorage.setItem("id",response.data.others._id)
      dispatch(authActions.login())
      navigate('/todo');
      })
  }
  return (
    <div className="signup">
      <div className='container'>
        <div className="row">
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center ">
            <HeadingComp first={'Sign'} second={'In'} />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className='d-flex flex-column w-100 p-5'>
              <input className='p-2 my-3' value={Input.email} onChange={change} name='email' type="email" placeholder='Enter Your Email' />
              <input className='p-2 my-3' value={Input.password} onChange={change} name='password' type="password" placeholder='Enter Your Password' />
              <button className='signup-btn p-2' onClick={submit}>Sign In</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignIn