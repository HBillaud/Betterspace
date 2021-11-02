import React, { FC } from 'react'
import CourseIcon from './CourseIcon';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './GridStyles';


const HomePage = (props: any) => {
  console.log(props.location.state)
    const name: string = props.location.state.name;
    const courses: string[] = props.location.state.courses;
    const classes = useStyles();
    console.log(name,courses)
     return (
         <div>
           <button type="button">Add course</button>
         <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             {name ? name : "" }'s courses
         </h3>
    {courses.length > 0 ? <CircularProgress /> : (
    <Grid  container alignItems="stretch" spacing={1}>
      {courses.map((course, index) => (
        <Grid key={index} item xs={12} sm={2} md={2}>
          <CourseIcon courseName={course} />
        </Grid>
      ))}
    </Grid>
    )}
    </div>
     )
}
export default HomePage;