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

  const handleCreateNew = async (blogObject) => {
    noteFormRef.current.toggleVisibility()
    console.log('creating new')

    try {
      const response = await blogService.create(blogObject)
      response.user = {
        username: user.username,
        name: user.name,
        id: response.user
      }
      const newBlogs = blogs.concat(response)
      setBlogs(newBlogs)
      notify('notification', `Blog added: ${response.title} by ${response.author}`)

    }
    catch (exception) {
      console.log(exception.response)
      notify('error', `${exception.response.data.error}`)
    }
    
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      user: blog.user._id,
      likes: blog.likes +1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log(updatedBlog)

    const response = await blogService.modify(updatedBlog, blog.id)
    setBlogs(blogs.map(blog => blog.id !== response.id ? blog : response))
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
        <CreateForm createNew={handleCreateNew}/>
        </Toggleble>
      </div>
      <div>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        )}
      </div>
      
    </div>
  )
}

export default App