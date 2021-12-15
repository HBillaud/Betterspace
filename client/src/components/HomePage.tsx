import React, { useEffect, useState } from 'react'
import CourseIcon from './CourseIcon';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './GridStyles';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const buttonStyle = {
  color: "white",
  background: "blue",
  width: "20%",
  padding: "1%",
  margin: "15px",
  cursor: "pointer",

}


const HomePage = (props: any) => {
      const history = useHistory();
      const [name, setName] = useState('');
      const [courses, setCourses] = useState([]);
      const params: {id: string} = useParams();
      useEffect(() => {
       async function getUserData() {
          try{
            const response: any = await axios.get(process.env.REACT_APP_SERVER + `/v1/student/${params.id}`, { withCredentials: true });
            if (response.status === 200) {
              setName(response.data.firstname);
              setCourses(response.data.courses);
            }
            else {
              alert ('Cannot find data for this user');
            }
          } catch (error: any) {
            console.log(error)
          }
        }
        getUserData();

      },[])
      return (

        <div>
{name ? (
  <div>
        <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {name ? name : "" }'s courses
    </h3>
    <div>
    <button type="button" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} onClick={() => 
                history.push({
                  pathname: `/v1/student/${params.id}/courses`
                })
    }>Add course</button>

{courses.length < 1 ? <CircularProgress style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} /> : (
  <>
  <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}}>
  <button style={buttonStyle} onClick={() => 
    history.push({
      pathname: `/v1/student/${params.id}/reportCard`
    })}>Current Report Card</button>
  </div>
<Grid  container alignItems="stretch" spacing={1} justifyContent="center" style={{ minHeight: '100vh' }}>
 {courses.map((course, index) => (
   <Grid key={index} item md={2}>
     <CourseIcon courseName={course} id={params.id} />
   </Grid>
 ))}
</Grid>
</>
)}

</div>
</div>) :
(<p>Loading...</p>)
}
   </div>
    )
}
export default HomePage;
