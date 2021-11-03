import React, { FC } from 'react'
import CourseIcon from './CourseIcon';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './GridStyles';


const HomePage = (props: any) => {
    const name: string = props.location.state.name || "";
    const courses: string[] = props.location.state.courses || [];
    const classes = useStyles();
    console.log(name,courses);
      return (
        <div>

        <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {name ? name : "" }'s courses
        </h3>
        <button type="button" style={{float: 'right', marginRight: '300px'}}>Add course</button>
   {courses.length < 1 ? <CircularProgress /> : (
   <Grid  container alignItems="stretch" spacing={1} justifyContent="center" style={{ minHeight: '100vh' }}>
     {courses.map((course, index) => (
       <Grid key={index} item md={2}>
         <CourseIcon courseName={course} />
       </Grid>
     ))}
   </Grid>
   )}
   </div>
    )

}
export default HomePage;