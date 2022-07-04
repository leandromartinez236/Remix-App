export default function posts() {
  return (
    <>
      <h2>Create new post</h2>
      <form method="POST">
        <div>
          <label htmlFor="title" />Title
          <input type="text" id='title' name="title" />
        </div>
        <div>
          <label htmlFor="content" />Content
          <textarea type="text" id='content' name="content" />
        </div>
        <button type="submit">Add new post</button>
      </form>
    </>
  )
}