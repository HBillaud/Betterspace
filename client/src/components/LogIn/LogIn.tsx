import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LogIn = () => {
  const history = useHistory()
  async function handleSubmit(e:any) {
    e.preventDefault()
    const email: string = e.target[0].value;
    const password: string= e.target[1].value;
    const isProf: boolean = e.target[2].checked;
    await axios.post(process.env.REACT_APP_SERVER + '/auth/login', {
      email: email,
      password: password,
      teach: isProf,
    }) .then(function (response: any) {
      if (response.data.status === 200) {
        sessionStorage.setItem('token', response.data.id);
        sessionStorage.setItem('professor', isProf.toString());
        if (!isProf) {
          history.push({
            pathname: `/v1/student/${response.data.id}`
          })
        }
        else {
          history.push({
            pathname: `v1/professor/${response.data.id}`
          })
        }
      } else {
        alert(response.data.message)
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
      <input type="checkbox" id="teach" name="teach"/>
      <label htmlFor="teach">I am a professor.</label><br/><br/>
      <button type="submit">Submit</button>
      <h5>Don't have an account? <a href="/signup">Sign up!</a></h5>

    </form>
    </div>
  )
}
export default LogIn;
