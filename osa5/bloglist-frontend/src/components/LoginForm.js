import React from 'react'
import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameInput: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordInput: PropTypes.func.isRequired
}

export default LoginForm