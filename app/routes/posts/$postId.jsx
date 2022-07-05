import { useLoaderData } from "@remix-run/react"
import { db } from "../../services/db"

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({ where: { id: params.postId } })
  return { post }
}

export default function SinglePost() {
  const { post } = useLoaderData()
  return (
    <>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </>
  )
}