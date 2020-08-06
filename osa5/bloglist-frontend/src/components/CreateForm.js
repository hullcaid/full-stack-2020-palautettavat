import React, {useState} from 'react'

const CreateForm = ({ createNew }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleInput = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorInput = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlInput = (event) => {
    setNewUrl(event.target.value)
  }

  const handleCreate = (event) => {
    event.preventDefault()
    createNew({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <div>
        <form onSubmit={handleCreate}>
          <div>
            title: 
              <input type="text" value={newTitle} name="title"
              onChange={handleTitleInput}
              />
          </div>
          <div>
            author: 
              <input type="text" value={newAuthor} name="author"
              onChange={handleAuthorInput}
              />
          </div>
          <div>
            url: 
              <input type="text" value={newUrl} name="url"
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