import React, { useState } from 'react'
import Button from './Button'

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 3,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <Button handleClick={toggleVisibility} label='view'/>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <Button handleClick={toggleVisibility} label='hide'/> <br/>
        {blog.url}<br/>
        likes {blog.likes} <Button handleClick={() => handleLike(blog)} label='like'/><br/>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
