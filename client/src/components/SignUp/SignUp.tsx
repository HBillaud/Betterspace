import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory()
  async function handleSubmit(e:any) {
    e.preventDefault()
    const email: string = e.target[0].value;
    const firstName: string = e.target[1].value;
    const lastName: string = e.target[2].value;
    const password: string= e.target[3].value;
    const isProf: boolean = e.target[4].checked; /* for now just store this */
    await axios.post(process.env.REACT_APP_SERVER + '/auth/signup', {
      email: email,
      password: password, 
    }) .then(function (response: any) {
      if (response.data.status === 200) {
        history.push({
          pathname: '/home',
          state: {name: firstName, courses: []}
        })
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
      <h3> Create an account </h3>
      <label htmlFor="email">Email: </label>
      <input type="text" id="email" name="email"/><br/><br/>
      <label htmlFor="firstName">First Name: </label>
      <input type="text" id="firstName" name="firstName"/><br/><br/>
      <label htmlFor="lastName">Last Name: </label>
      <input type="text" id="lastName" name="lastName"/><br/><br/>
      <label htmlFor="password">Password: </label>
      <input type="text" id="password" name="password"/><br/><br/>
      <input type="checkbox" id="teach" name="teach"/>       
      <label htmlFor="teach">I am a professor.</label><br/><br/>
      <button type="submit">Submit</button>
      <h5>Already have an account? <a href="/">Log in!</a></h5>

    </form>
    </div>
  )  
}
export default SignUp;