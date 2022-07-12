import { useLoaderData } from "@remix-run/react"
import { db } from "../../services/db"
import { Link } from "react-router-dom"

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({ where: { id: params.postId } })
  return { post }
}

export default function SinglePost() {
  const { post } = useLoaderData()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Link to='/posts'>📄 Lista de posts</Link>
      <div className="post-id" key={post.id}>
        <h3>{post.title[0].toUpperCase() + post.title.substring(1)}</h3>
        <p>{post.body}</p>
      </div>
    </div>
  )
}