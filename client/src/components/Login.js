import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'


const Login = (props) => {
  const initialUser = { username: "", password: "" }
  const [creds, setCreds] = useState(initialUser)

  const handlelogin = event => {
    event.preventDefault()
    console.log("LINE -10- creds:", creds)
    axiosWithAuth()
      .post(`/login`, creds)
      .then(res=> localStorage.setItem(`token`, res.data.payload))     
      .then(_ => props.history.push('/bubblepage'))
      .then(_ => setCreds(initialUser))
      .catch(_ => console.error(_))


  }
  const handleChange = event => setCreds({ ...creds, [event.target.name]: event.target.value })

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>checkout them there buBBles brUh</p>
      <form onSubmit={handlelogin}>
        <input
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="username"
          value={creds.username}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="password"
          value={creds.password}
        />
        <button type="submit">login</button>

      </form>
    </>
  );
};

export default Login;
