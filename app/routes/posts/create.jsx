import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { db } from "../../services/db";

const badRequest = data => {
  return json(data, { status: 400 })
}

export const action = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const body = form.get('body')

  const fieldErrors = {
    title: title.length < 3 ? 'Title must be at least 3 characters' : null,
    body: body.length < 5 ? 'Body must be at least 5 characters' : null
  }
  const hasErrors = Object.values(fieldErrors).some(Boolean)

  const fields = { title, body }

  if (hasErrors) {
    return badRequest({ fieldErrors, fields })
  }
  const post = await db.post.create({ data: fields })

  return redirect(`/posts/${post.id}`)
}
export function ErrorBoundary({ error }) {
  return (
    <div>
      <strong>😢 Algo salió mal: <span style={{ color: 'red' }}>{error.message}</span></strong>
    </div>
  )
}

export default function CreatePost() {
  const { state } = useTransition()
  const data = useActionData()

  const isSubmitting = state === 'submitting'
  return (
    <>
      <h2>Create new post</h2>
      <Form disabled={isSubmitting} method="POST">
        <div>
          <label htmlFor="title" />Title
          <input placeholder="Title of Post" type="text" id='title' name="title" />
          {data?.fieldErrors?.title && <small style={{ color: 'red' }}>{data?.fieldErrors?.title}</small>}
        </div>
        <div>
          <label htmlFor="body" />body
          <input placeholder="Content of Post" type="text" id='body' name="body" />
          {data?.fieldErrors?.body && <small style={{ color: 'red' }}>{data?.fieldErrors?.body}</small>}

        </div>
        <button disabled={isSubmitting} type="submit">
          {
            !isSubmitting ? 'Add new post' : 'Wait for it...'
          }
        </button>
      </Form>
    </>
  )
}