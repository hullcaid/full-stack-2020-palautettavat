import React from 'react'

const CreateForm = ({
  handleTitleInput,
  title,
  handleAuthorInput,
  author,
  handleUrlInput,
  url,
  handleCreate
}) => {
  return (
    <div>
      <h2>create new</h2>
      <div>
        <form onSubmit={handleCreate}>
          <div>
            title: 
              <input type="text" value={title} name="title"
              onChange={handleTitleInput}
              />
          </div>
          <div>
            author: 
              <input type="text" value={author} name="author"
              onChange={handleAuthorInput}
              />
          </div>
          <div>
            url: 
              <input type="text" value={url} name="url"
              onChange={handleUrlInput}
              />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateForm