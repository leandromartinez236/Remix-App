import { Link, useLoaderData } from '@remix-run/react'

export const loader = () => {
  const data = {
    posts: [
      {
        id: 1,
        title: 'Post 1',
        content: 'Hola soy un titulo común y corriente'
      },
    ]
  }
  return data
}

export default function Index() {
  const { posts } = useLoaderData()
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h2>Welcome to Remix</h2>
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
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
