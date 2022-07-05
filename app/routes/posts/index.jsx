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
      <h2>Lista de Posts</h2>
      <aside>
        <Outlet />
      </aside>
      <nav>
        <ul>
          <Link to='/about'>Ir a about</Link>
        </ul>
        <ul>
          <Link to='/posts/create'>Crear un post</Link>
        </ul>
      </nav>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
