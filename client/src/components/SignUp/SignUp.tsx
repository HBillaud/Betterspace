import React, { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory()
  async function handleSubmit(e:any) {
    e.preventDefault()
    const id: string = e.target[0].value;
    const email: string = e.target[1].value;
    const firstName: string = e.target[2].value;
    const lastName: string = e.target[3].value;
    const password: string= e.target[4].value;
    const isProf: boolean = e.target[5].checked; /* for now just store this */
    await axios.post(process.env.REACT_APP_SERVER + '/auth/signup', {
      _id: id,
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password, 
     // professor: isProf,
    }) .then(function (response: any) {
      if (response.data.status === 200) {
        localStorage.setItem('token', 'true');
        history.push({
          pathname: `home`,
          state: {name: firstName, courses: []}
        })
      } else {
        alert('Invalid data\n' + response.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })

  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

    <form onSubmit={handleSubmit}>
      <h3> Create an account </h3>
      <label htmlFor="id">School id (10-digit): </label>
      <input type="text" id="id" name="id"/><br/><br/>
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
      <h5>Already have an account? <a href="/login">Log in!</a></h5>

    </form>
    </div>
  )  
}
export default SignUp;
