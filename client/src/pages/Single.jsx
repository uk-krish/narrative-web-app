import { useContext, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '../components/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split('/').pop();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/post/${postId}`);
      setPost(res.data[0]); // Adjust according to your API response
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/post/${postId}`, {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };


  useEffect(() => {
    fetchPost();
  }, [postId]); // Fetch post when postId changes
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <main className='max-w-[1350px] py-10 mx-auto flex lg:flex-row flex-col gap-20'>
      <section className='px-5'>
        <p className='md:text-4xl text-3xl font-bold'>
          {post?.title}
        </p>
        <div className='py-5 flex items-center'>
          {
            post?.uimg ? (
              <img
                className='w-16 h-16 rounded-full mr-3'
                src={post.uimg} 
                alt="User Avatar"
              />
            ) : (
              <AccountCircleIcon className='rounded-full mr-3 scale-150' fontSize='large' />
            )
          }
          <div className='select-none'>
            <h1 className='font-bold text-[18px]'>{post?.username}</h1>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.id === post?.uid && (
            <section className='flex px-4'>
              <Link className='px-4 cursor-pointer' to={`/write?edit=2`} state={post} ><EditIcon /></Link>
              <span className='px-4 cursor-pointer' onClick={handleDelete}><DeleteIcon /></span>
            </section>
          )}
        </div>
        <div className="flex justify-center">
          <img className='w-[800px] justify-center items-center' src={`../upload/`+post?.postimg} alt="Post" />
        </div>
        <p className='text-[18px] leading-8 mt-5'  dangerouslySetInnerHTML={{ __html: post?.desc }} />
          <div  />
      </section>
      <Menu />
    </main>
  );
};

export default Single;
