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
    <div className="form-container">
      <h2>Create new post</h2>
      <Form disabled={isSubmitting} method="POST">
        <div className="form-inputs">
          <input className="input" required='' type="text" placeholder="Title" id='title' name="title" />
          {data?.fieldErrors?.title && <small style={{ color: 'red' }}>{data?.fieldErrors?.title}</small>}
        </div>
        <div className="form-inputs">
          <input className="input" required='' type="text" placeholder="Content" id='body' name="body" />
          {data?.fieldErrors?.body && <small style={{ color: 'red' }}>{data?.fieldErrors?.body}</small>}
        </div>
        {/* <button disabled={isSubmitting} type="submit">
          {
            !isSubmitting ? 'Add new post' : 'Wait for it...'
          }
        </button> */}
        <button className="btn-send" disabled={isSubmitting} type='submit'>
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>

      </Form>
    </div>
  )
}