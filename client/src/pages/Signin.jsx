/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie'
import { AuthContext } from '../context/AuthContext'
import CloseIcon from "@mui/icons-material/Close";
const Signin = () => {
  const [inputs, Setinputs] = useState({
    username: "",
    email: "",
    password: "",
    con_password: "",
  })
  const [err, Seterr] = useState('');
  const [switching, SetSwitching] = useState(false);
  const { login, ispopup, Setispopup,signup } = useContext(AuthContext)
  const navigate = useNavigate();

  const ClosePopup = () => {
    Setispopup(!ispopup);
  }
  const isSwitching = () => {
    SetSwitching(!switching)
  }
  const HandleInput = (e) => { Setinputs(prev => ({ ...prev, [e.target.name]: e.target.value })) }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tempinput = {
        username: inputs.username,
        password: inputs.password
      }
      await login(tempinput);
      Seterr("")
      ClosePopup();
    } catch (err) {
      Seterr(err.response.data);
    }
  }
  const handleSubmit_signup = async (e) => {
    e.preventDefault();
    if(inputs.password!=inputs.con_password){
      return alert("Password are not same");
    }
    try {
      const tempinput = {
        username: inputs.username,
        email:inputs.email,
        password: inputs.password
      }
      await signup(tempinput);
      Seterr("")
      isSwitching();
    } catch (err) {
      Seterr(err.response.data);
    }
  }
  return (
    <main className={`fixed  z-20 inset-0 backdrop-blur-sm  ${ispopup ? 'absolute' : 'hidden'}  `}>
      <section className={` ${switching ? 'hidden' : ''} popup_form border bg-white border-[#e5e7eb] md:w-7/12 w-full  max-w-[400px] shadow-sm `}>
        <div
          onClick={ClosePopup}
          className="float-end  p-4 cursor-pointer"
        >
          <CloseIcon />
        </div>
        <form onSubmit={handleSubmit} className='w-4/5 max-w-[380px] mx-auto my-10'>
          <div className='flex flex-col mt-5'>
            <h1 className='text-center text-2xl py-3 '>Signin</h1>
            <label htmlFor="">Username</label>
            <input required
              className='p-2 outline-none mt-2 border-b '
              type="text" placeholder='username' name="username" onChange={HandleInput} />
            <div className='flex flex-col mt-5 border-b'>
              <label htmlFor="">password</label>
              <input required
                className='p-2 outline-none mt-2 '
                type="password" placeholder='password' name="password" onChange={HandleInput} />
            </div>
            <input className='my-5 cursor-pointer bg-black text-white rounded-r-md p-2 ' type="submit" value="Signin" onClick={handleSubmit} />
            {err && <p>{err}</p>}
            <span className='text-center mx-auto'  >Don't you have an account? <a className='text-center text-blue-500 cursor-pointer mx-3' onClick={isSwitching}>Sign up</a></span>
          </div>
        </form>
      </section>


      {/* Signin */}
      <section className={` ${switching ? 'block' : 'hidden'} popup_form border bg-white border-[#e5e7eb] md:w-7/12 w-full max-w-[400px]  x-2 shadow-sm `}>
        <div
          onClick={ClosePopup}
          className="float-end  p-4 cursor-pointer"
        >
          <CloseIcon />
        </div>
        <form onSubmit={handleSubmit_signup} className='w-4/5  max-w-[380px] mx-auto my-10'>
          <h1 className='text-center text-2xl py-3 '>Signin</h1>
          <div className='flex flex-col mt-5'>
            <div className='flex flex-col'>
              <label htmlFor="">Username</label>
              <input required
                className='p-2 outline-none mt-2 border-b '
                type="text" placeholder='username' name="username" onChange={HandleInput} />
            </div>
            <div className='flex flex-col mt-5'>
              <label htmlFor="">Email</label>
              <input required
                className='p-2 outline-none mt-2 border-b '
                type="text" placeholder='email' name="email" onChange={HandleInput} />
            </div>

            <div className='flex flex-col mt-5 border-b'>
              <label htmlFor="">password</label>
              <input required
                className='p-2 outline-none mt-2 '
                type="password" placeholder='password' name="password" onChange={HandleInput} />
            </div>

            <div className='flex flex-col mt-5 border-b'>
              <label htmlFor="">Confirm password</label>
              <input required
                className='p-2 outline-none mt-2 '
                type="password" placeholder='password' name="con_password" onChange={HandleInput} />
            </div>

            <input className='my-5 cursor-pointer bg-black text-white rounded-r-md p-2 ' type="submit" value="Signup" onClick={handleSubmit_signup} />
            {err && <p>{err}</p>}
            <span className='text-center mx-auto'  >Already have an account? <a className='text-center text-blue-500 cursor-pointer mx-3' onClick={isSwitching}>Sign on</a></span>
          </div>
        </form>
      </section>

    </main>
  )
}

export default Signin
