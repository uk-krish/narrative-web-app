import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import moment from 'moment';
const Write = () => {
  const state = useLocation().state
  const [desc, Setdesc] = useState(state?.desc || "");
  const [title, Settitle] = useState(state?.title || "");
  const [file, Setfile] = useState(state?.postimg || null);
  const [cat, setCat] = useState(state?.cat || "")
  const category = [
    {
      id: 0,
      title: "art",
    }
    ,
    {
      id: 1,
      title: "science",
    }
    ,
    {
      id: 2,
      title: "technology",
    }
    ,
    {
      id: 3,
      title: "cinema",
    }
    ,
    {
      id: 4,
      title: "design",
    }
    ,
    {
      id: 5,
      title: "food",
    }
    ,
  ]

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8080/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  const HandleSumbit = async (e) => {
    e.preventDefault();
    try {
      let imgurl1 = null;
      if (typeof file === "string") {
        imgurl1 = file;
      }
      else if(file){
        imgurl1 = await upload();
      }
      state ? await axios.put(`http://localhost:8080/api/post/${state.pid}`, {
        title,
        desc,
        cat,
        img: file ? imgurl1 : ""
      },
        {
          withCredentials: true,
        }) :
        await axios.post(`http://localhost:8080/api/post/`, {
          title,
          desc,
          cat,
          img: file ? imgurl1 : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        },
          {
            withCredentials: true,
          })

    } catch (err) {
      console.log(err);
    }

  }
  return (
    <main className='max-w-[1280px] mx-auto flex justify-between flex-wrap gap-5 my-5 '>
      <section className=' flex-auto px-3 max-w-[900px]'>
        <input required className='p-3 w-full outline-none border-b ' value={title} type="text" placeholder='Title' onChange={e => Settitle(e.target.value)} />
        <div className='mt-10 w-full h-full ' >
          <ReactQuill className='h-[40vh] ' theme='snow' value={desc} onChange={Setdesc} />
        </div>
      </section>
      <section className='max-w-[400px] mt-10 flex-auto mx-auto'>
        <div className='flex flex-col border   p-5 '>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>
          <input type="file" className='hidden' name="" id="file" onChange={e => Setfile(e.target.files[0])} />
          <label htmlFor="file">Upload Image</label>
          <div className='w-full flex justify-between'>
            <button>Save as Draft</button>
            <button onClick={HandleSumbit}>Publish</button>
          </div>
        </div>
        <div>
          <h1>Category</h1>
          {
            category.map((cati) => (
              <div key={cati.id}>
                <input type="radio" checked={cat === cati.title} name="cat" id={cati.title} onChange={e => setCat(e.target.value)} value={cati.title} />
                <label htmlFor={cat.title}>{cati.title} </label>
              </div>
            ))
          }
        </div>
      </section>

    </main>
  )
}

export default Write
