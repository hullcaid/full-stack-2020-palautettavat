import React from 'react'

const LoginForm = ({
  handleLogin, 
  username, 
  handleUsernameInput,
  password,
  handlePasswordInput
}) => {

  return(
    <form onSubmit={handleLogin}>
      <div>
        username
          <input type="text" value={username} name="Username"
            onChange={handleUsernameInput}
          />
      </div>
      <div>
        password
          <input type="password" value={password} name="password"
            onChange={handlePasswordInput}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm