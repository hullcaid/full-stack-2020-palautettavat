import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) =>{
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    } 
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleInput = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorInput = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlInput = (event) => {
    setUrl(event.target.value)
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()
    console.log('creating new')
    const newListing = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(newListing)
    const newBlogs = blogs.concat(response)
    setBlogs(newBlogs)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  if (user === null) {
    return (
      <div>
        <h2> Log in to application</h2>
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          handleUsernameInput={handleUsernameInput} 
          password={password}
          handlePasswordInput={handlePasswordInput}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
      <p>{user.username} logged in <Button handleClick={handleLogout} label='logout'/></p>
      </div>
      <div>
        <CreateForm 
          handleTitleInput={handleTitleInput}
          title={title}
          handleAuthorInput={handleAuthorInput}
          author={author}
          handleUrlInput={handleUrlInput}
          url={url}
          handleCreate={handleCreateNew}
        />
      </div>
      <div>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      
    </div>
  )
}

export default App