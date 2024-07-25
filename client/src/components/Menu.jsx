import { Link, useLocation } from "react-router-dom"
import { postsd } from "../constants/index"
import { useEffect, useState } from "react"
import axios from "axios";

const Menu = () => {

  const [posts, Setposts] = useState([]);
  const postId = location.pathname.split('/').pop();
  const cat = useLocation().search
  const FetchData = async () => {
    try {
      let res = await axios.get(`http://localhost:8080/api/post/${cat || ''}`);
      if (res.data.length === 1) {
        res = await axios.get(`http://localhost:8080/api/post/`);
      }
      const shuffledPosts = res.data.sort(() => 0.5 - Math.random());
      const selectedPosts = shuffledPosts.slice(0, 5);
      Setposts(selectedPosts);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    FetchData();
    
  },[cat])
  return (
    <main className="w-full mr-16 min-w-[400px] mx-auto flex flex-col ">
      <h1 className="text-center text-2xl font-semibold">Other post you may like</h1>
      <div className="max-[400px] justify-center flex flex-wrap gap-10   ">
        {
          posts.map((post) => (
            <>
              {
                post.id != postId
                && <Link to={`/post/${post.id}`} key={post.id} className="py-8">
                  <img className="object-cover  h-[200px]  w-full " src={`../upload/`+post.img} alt="" />
                  <h1 className="leading-7 font-bold text-[20px] ">{post.title}</h1>
                  <Link className=' p-3 border w-full text-center my-3 inline-block'>Read more</Link>
                </Link>
              }
            </>
          ))
        }
      </div>
    </main>
  )
}

export default Menu