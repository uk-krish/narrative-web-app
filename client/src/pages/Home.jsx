import React, { useEffect, useState } from 'react'
import { postsd } from '../constants/index'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import Signin from './Signin';

const Home = () => {
  const[post,Setpost]=useState([]);
  const cat=useLocation().search;
  const fetchpost=async()=>{
    const res=await axios.get(`http://localhost:8080/api/post${cat}`);
    Setpost(res.data)
  }
  useEffect(()=>{
    fetchpost()
  },[post])
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <main className='max-w-[1280px]   mx-auto'>
     <div>
      {
        post.map((post)=>(
          <Link to={`/post/${post.id}`} key={post.id} className='my-12 py-5 flex items-center  gap-[10rem] border-b-2'>
            <div className=''>
              <img className='object-cover ' src={`../upload/`+post.img} alt="" />
            </div>
            <div className='max-w-[700px]' >
              <Link className='text-2xl font-bold'>
              {post.title}
              </Link>
              <p className='leading-7 mt-2'>{getText(post.desc).slice(0,300)}</p>
              <button className='my-10 p-3 border'>Read More</button>
            </div>
            <div className='my-10 '>

            </div>
          </Link>
        ))
      }

     </div>
    
    </main>
  )
}

export default Home
