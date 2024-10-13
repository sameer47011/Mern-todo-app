import axios from 'axios';
import React, { useState,useEffect } from 'react'

const UpdateTask = ({display,update}) => {
  // const [Inputs, setInputs] = useState({title:update.title,body:update.body})
  const [Inputs, setInputs] = useState({ title: "", body: "" });

  useEffect(() => {
    if(update) {
      setInputs({ title: update.title, body: update.body });
    }
  }, [update]);

  const change = (e)=>{
    const {name,value} = e.target;
    setInputs({...Inputs,[name]:value})
  }
  const submit = async()=>{
    // console.log(Inputs);
await axios.put(`http://localhost:1000/api/v2/updateTask/${update._id}`,Inputs).then((response)=>{
  console.log(response);
  
})

    
  }
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h1>Update Your Task</h1>
      <input type="text" name='title' className='todo-inpus my-4 w-100 p-3' value={Inputs.title} onChange={change} />
      <textarea name="body"   className='todo-inpus w-100 p-3' value={Inputs.body} onChange={change} />
      <div>
      <button className='btn btn-dark my-4' onClick={submit}>UPDATE</button>
      <button className='btn btn-danger my-4 mx-3' onClick={()=>display('none')}>CLOSE</button>
      </div>

    </div>
  )
}

export default UpdateTask