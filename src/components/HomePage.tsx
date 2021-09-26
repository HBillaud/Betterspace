import React, { FC } from 'react'
import CourseIcon from './CourseIcon';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './GridStyles';

interface HomeProps {
     username?: string;
     courses?: string[];
}
const HomePage: FC<HomeProps> = ({ username="unknown", courses=[] }) => {
    const classes = useStyles();

     return (
         <div>
         <h3>
             {username}'s courses
         </h3>
    {!courses.length ? <CircularProgress /> : (
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