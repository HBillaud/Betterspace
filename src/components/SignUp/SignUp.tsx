import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory()
  async function handleSubmit(e:any) {
    e.preventDefault()
    const email: string = e.target[0].value;
    const password: string= e.target[1].value;
    const isProf: boolean = e.target[2].checked; /* for now just store this */
    await axios.post(process.env.REACT_APP_SERVER + '/auth/signup', {
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
    <form onSubmit={handleSubmit}>
      <h3> Create an account </h3>
      <label htmlFor="email">Email: </label>
      <input type="text" id="email" name="email"/><br/><br/>
      <label htmlFor="password">Password: </label>
      <input type="text" id="password" name="password"/><br/><br/>
      <input type="checkbox" id="teach" name="teach"/>       
      <label htmlFor="teach">I am a professor.</label><br/><br/>
      <button type="submit">Submit</button>
    </form>
  )  
}
export default SignUp;
