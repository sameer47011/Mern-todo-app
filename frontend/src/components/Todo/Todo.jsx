import React, { useState, useEffect } from 'react'
import './Todo.css'
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateTask from './UpdateTask';
import axios from 'axios'
let toUpdateData = [];
const Todo = () => {
  let id = sessionStorage.getItem('id');
  const [Inputs, setInputs] = useState({ title: "", body: "" })
  const [data, setData] = useState([]);
  const [toUpdateData, setToUpdateData] = useState(null);  // yeh line add karein

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }

  const show = () => {
    document.getElementById('textarea').style.display = "block"
  }
  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body Can't be Empty")
    }
    else {
      if (id) {
        await axios.post('http://localhost:1000/api/v2/addTask/', { title: Inputs.title, body: Inputs.body, id: id }).then((response) => {
          console.log(response);

        })
        setInputs({ title: "", body: "" })
        toast.success('Your Task is Added')
      } else {
        setData([...data, Inputs]);
        setInputs({ title: "", body: "" })
        toast.success('Your Task is Added')
        toast.error("Your Task is Not Saved ! Please SignUp")
      }

    }
  }

  const del = async (cardid) => {
    if (id) {
      await axios.delete(`http://localhost:1000/api/v2/deletedTask/${cardid}`, { data: { id: id }, }).then(() => {
        toast.success('Your Task is Deleted')

      })

    } else {
      toast.error(" Please SignUp First")

    }
    // data.splice(id, "1");
    // setData([...data])
  }

  const updatedisplayfun = (value) => {
    document.getElementById('todo-update').style.display = value;
  }

  const updateTask = (value) => {
    setToUpdateData(data[value]);  // setToUpdateData ko use karein
}

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`).then((response) => {
          setData(response.data.list);
        })
      }
      fetch();

    }
  }, [submit])
  return (
    <>
      <div className='todo'>
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column my-4">
          <div className='d-flex flex-column todo-inputs-div w-50 p-1'>
            <input type="text" name='title' value={Inputs.title} placeholder='TITLE' className='my-2 p-2 todo-inputs' onClick={show} onChange={change} />
            <textarea type="text" name='body' value={Inputs.body} id="textarea" placeholder='BODY' className='p-2 todo-inputs' onChange={change} />
          </div>

          <div className='w-50 d-flex justify-content-end my-3'>
            <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {data && data.map((item, index) => (
                <div className='col-lg-3 col-10 mx-5 my-2' key={index}>
                  <TodoCards id={item._id} title={item.title} body={item.body} delid={del} display={updatedisplayfun} updateid={index} toBeUpdate={updateTask} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <div className="todo-update" id='todo-update'>
        <div className="container update">
          <UpdateTask display={updatedisplayfun} update={toUpdateData} />
        </div>
      </div>
    </>
  )
}

export default Todo