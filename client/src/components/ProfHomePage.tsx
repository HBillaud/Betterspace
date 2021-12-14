import React, { useEffect, useState } from 'react'
import CourseIcon from './CourseIcon';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './GridStyles';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ProfHomePage = (props: any) => {
      const history = useHistory();
      const [name, setName] = useState('');
      const [courses, setCourses] = useState([]);
      const params: {id: string} = useParams();
      const [modalIsOpen, setIsOpen] = useState(false);
      
      function openModal() {
        setIsOpen(true);
      }
    
      /* function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      } */
    
      function closeModal() {
        setIsOpen(false);
      }

      async function handleSubmit(e:any) {
        e.preventDefault()
        const id: string = e.target[0].value.toLowerCase();
        const title: string = e.target[1].value;
        const description: string = e.target[2].value;
        await axios.post(process.env.REACT_APP_SERVER + `/v1/professor/${params.id}`, {
          _id: id,
          title: title,
          description: description,
          professor: params.id,
        }) .then(function (response: any) {
          closeModal();
        }).catch((error) => {
          console.log(error);
        })
      }

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
              <button type="button" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} onClick={openModal} >Create new course</button>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <h2>Create a Course</h2>
                  <button onClick={closeModal}>close</button>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="Course ID">ID: </label>
                    <input type="text" id="id" name="id"/><br/><br/>
                    <label htmlFor="title">Course Title: </label>
                    <input type="text" id="title" name="title"/><br/><br/>
                    <label htmlFor="description">description: </label>
                    <input type="text" id="description" name="description"/><br/><br/>
                    <button type="submit">Submit</button>
                  </form>
                </Modal>
              <button type="button" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} onClick={() => {
                history.push({
                  pathname: `/v1/professor/${params.id}/courses`
                })
              }}>View All Courses</button></div>

              {courses.length < 1 ? <CircularProgress style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} /> : (
                <Grid  container alignItems="stretch" spacing={1} justifyContent="center" style={{ minHeight: '100vh' }}>
                  {courses.map((course, index) => (
                    <Grid key={index} item lg={2}>
                      <CourseIcon courseName={course} id={params.id} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>) :
            (<p>Loading...</p>)
          }
        </div>
      )
}
export default ProfHomePage;
