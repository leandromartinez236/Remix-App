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
  return (
    <div >
      <h2>Welcome to Remix</h2>
      <nav >
        <ul style={{ marginBottom: '16px' }}>
          <Link to='/posts'>Lista de posts</Link>
        </ul>
        <ul>
          <Link to='/posts/create'>Crear un post</Link>
        </ul>
      </nav>
    </div>
  )
}
