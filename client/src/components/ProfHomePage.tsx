import React, { useEffect, useState } from 'react'
import CourseIcon from './CourseIcon';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './GridStyles';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ProfHomePage = (props: any) => {
      const [name, setName] = useState('');
      const [courses, setCourses] = useState([]);
      const params: {id: string} = useParams();
      useEffect(() => {
       async function getUserData() {
          try{
            const response: any = await axios.get(process.env.REACT_APP_SERVER + `/v1/professor/${params.id}`, { withCredentials: true });
            if (response.status === 200) {
              setName(response.data.firstname);
              setCourses(response.data.courses);
              console.log(response.data);
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
{courses.length < 1 ? <CircularProgress style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} /> : (
<Grid  container alignItems="stretch" spacing={1} justifyContent="center" style={{ minHeight: '100vh' }}>
 {courses.map((course, index) => (
   <Grid key={index} item lg={2}>
     <CourseIcon courseName={course} id={params.id} />
   </Grid>
 ))}
</Grid>
)}
    <button type="button" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} >Create new course</button></div>

</div>) :
(<p>Loading...</p>)
}
   </div>
    )
}
export default ProfHomePage;
