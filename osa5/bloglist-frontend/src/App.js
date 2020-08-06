import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleble from './components/Togglable'
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
  const [notificationType, setNotificationType] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

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

  const noteFormRef = useRef()

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
      notify('notification', `Welcome ${user.name}!`)
    } catch (exception) {
      notify('error', 'Wrong username or password')
    } 
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogListUser')
    notify('notification', 'User logged out')
    setUser(null)
  }

  const handleCreateNew = async (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    console.log('creating new')
    const newListing = {
      title: title,
      author: author,
      url: url
    }

    try {
      const response = await blogService.create(newListing)
      const newBlogs = blogs.concat(response)
      setBlogs(newBlogs)
      notify('notification', `Blog added: ${response.title} by ${response.author}`)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (exception) {
      console.log(exception.response)
      notify('error', `${exception.response.data.error}`)
    }
    
  }

  const notify = (type, message) => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationType(null)
      setNotificationMessage(null)
    }, 3000)
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



  if (user === null) {
    return (
      <div>
        <Notification
          type={notificationType}
          message={notificationMessage}
        />
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
      <Notification
        type={notificationType}
        message={notificationMessage}
      />
      <div>
      <p>{user.username} logged in <Button handleClick={handleLogout} label='logout'/></p>
      </div>
      <div>
        <Toggleble buttonLabel="New blog" ref={noteFormRef}>
        <CreateForm 
          handleTitleInput={handleTitleInput}
          title={title}
          handleAuthorInput={handleAuthorInput}
          author={author}
          handleUrlInput={handleUrlInput}
          url={url}
          handleCreate={handleCreateNew}
        />
        </Toggleble>
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