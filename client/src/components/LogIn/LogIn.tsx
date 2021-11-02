import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LogIn = () => {
  const history = useHistory()
  async function handleSubmit(e:any) {
    e.preventDefault()
    const email: string = e.target[0].value;

    const password: string= e.target[1].value;
    await axios.post(process.env.REACT_APP_SERVER + '/auth/login', {
      email: email,
      password: password, 
    }) .then(function (response: any) {
      if (response.data.status === 200) {
        history.push('/home')
      } else {
        alert('Invalid information given')
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

    <form onSubmit={handleSubmit}>
      <h3> Log In </h3>
      <label htmlFor="email">Email: </label>
      <input type="text" id="email" name="email"/><br/><br/>
      <label htmlFor="password">Password: </label>
      <input type="text" id="password" name="password"/><br/><br/>
      <button type="submit">Submit</button>
      <h5>Don't have an account? <a href="/signup">Sign up!</a></h5>

    </form>
    </div>
  )  
}
export default LogIn;