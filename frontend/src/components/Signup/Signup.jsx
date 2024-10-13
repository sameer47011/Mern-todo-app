import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeadingComp from './HeadingComp'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [Input, setInput] = useState
    ({
      email: "",
      username: "",
      password: "",
    })
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:1000/api/v1/register', Input).then((response) => {
      // console.log(response);
      if(response.data.message ==="User already exists"){
      toast.error(response.data.message);
      }else {
      toast.success(response.data.message);
      setInput({
        email: "",
        username: "",
        password: "",
      })
      navigate('/signin')
      }
     

    })


  }
  return (
    <div className="signup">
      <ToastContainer />
      <div className='container'>
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className='d-flex flex-column w-100 p-5'>
              <input className='p-2 my-3' onChange={change} value={Input.email} name='email' type="email" placeholder='Enter Your Email' />
              <input className='p-2 my-3' onChange={change} value={Input.username} name='username' type="text" placeholder='Enter Your Username' />
              <input className='p-2 my-3' onChange={change} value={Input.password} name='password' type="password" placeholder='Enter Your Password' />
              <button className='signup-btn p-2' onClick={submit}>Sign Up</button>
            </div>
          </div>
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center ">
            <HeadingComp first={'Sign'} second={'Up'} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup