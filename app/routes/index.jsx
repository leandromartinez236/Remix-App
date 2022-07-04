import { Link } from '@remix-run/react'
export default function Index() {
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
    </div>
  )
}
