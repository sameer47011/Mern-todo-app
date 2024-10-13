import React from 'react'
import './Navbar.css';

import { GiWhiteBook } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../../store';
const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const logout = () =>{
    sessionStorage.clear('id')
dispatch(authActions.logout());
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/"><b>
            <GiWhiteBook /> &nbsp;
            todo
          </b></Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/about-us">About Us</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
              </li>
              {!isLoggedIn && (
                <>
                <li className="nav-item mx-2">
                  <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign Up</Link>
                </li>
              </>
              )}

              {isLoggedIn &&(
                 <li className="nav-item mx-2" onClick={logout}>
                 <Link className="nav-link active btn-nav" aria-current="page" to="/">Log Out</Link>
               </li>
              )}


            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar