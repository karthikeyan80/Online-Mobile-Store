import React from 'react'

const Login = () => {
  return (
    <div>
        <div>
            <h1>Admin Panel </h1>
            <form >
                <div>
                    <p>Email Address </p>
                    <input type="email" placeholder='Your@email.com ' required />
                </div>
                <div>
                    <p>Password </p>
                    <input type="password" placeholder='enter your password here' required />
                </div>
                <button type="submit">Login </button>
            </form>
        </div>
    </div>
  )
}

export default Login