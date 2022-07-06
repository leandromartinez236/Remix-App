import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { db } from '../../services/db'

export const loader = async () => {
  const posts = await db.post.findMany()
  return { posts }
}

export default function Index() {
  const { posts } = useLoaderData()
  return (
    <div>
      <nav className='navbar'>
        <ul>
          <Link to='/posts/create'>Crear un post</Link>
        </ul>
      </nav>
      <h2>Lista de Posts</h2>
      <aside>
        <Outlet />
      </aside>
      <div className="flex-posts">
        {posts.map(post => (
          <div className='post-container' key={post.id}>
            <div className="post-content">
              <h3>{post.title[0].toUpperCase() + post.title.substring(1)}</h3>
              <p>{post.body}</p>
            </div>
            <div className="btn-container">
              <button class="noselect"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
