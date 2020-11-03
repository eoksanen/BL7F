import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
  }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField onChange={handleUsernameChange} label="username" />
        </div>
        <div>
        <TextField onChange={handlePasswordChange} label="password" type="password"/>       
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">login</Button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm