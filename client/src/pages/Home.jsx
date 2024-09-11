import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();;
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-zinc-600 text-xs sm:text-sm'>Hello and welcome! We’re thrilled to have you here at Spy Blog's. Whether you’re here to dive into the latest trends, explore insightful articles, or just find a bit of inspiration, you’re in the right place.</p>
        <Link to='/search' className='text-xm sm:text-sm text-orange-500 font-bold hover:underline'>
          View all posts
        </Link>
      </div>

      <div className='p-3 bg-blue-100 dark:bg-zinc-700'>
        <CallToAction />
      </div>

      <div className="max-w-[1500px] mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-8">
              <h2 className='text-2xl font-semibold text-center'>Recents Blogs</h2>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                {
                  posts.map((post) => (
                    <PostCard key={post._id}  post={post}/>
                  ))
                }
              </div>
              <Link to={'/search'} className='text-lg  text-orange-500 hover:underline text-center'>
               Viwe all posts
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}