import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useStyles from './GridStyles';
import StudentAssignmentPage from './StudentAssignmentPage';

const StudentCoursePage = (props :any) => {
  const params: {id: string, courseName: string} = useParams();

  const [option, setOption] = useState("Information");
  const [description, setDescription] = useState("");
  const [assignments, setAssignments] = useState([]);

  const buttonStyle = {
    color: "white",
    background: "blue",
    width: "20%",
    padding: "1%",
    margin: "20px",
    cursor: "pointer"
  }

  useEffect(() => {
    async function getCourseInfo() {
      try {
        const response: any = await axios.get(process.env.REACT_APP_SERVER + `/v1/student/${params.id}/courses/${params.courseName}`, { withCredentials: true });
        if(response.status == 200) {
          setDescription(response.data.description);
          setAssignments(response.data.assignments);
        }
      } catch(error: any) {
        console.log(error);
      }
    }
    getCourseInfo();
  }, [])

  const courseInfo = () => {
    if(option === "Information") {
      return(
        <div style={{margin: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {description}
        </div>
      )
    } else if(option === "Assignments") {
      return(
        <StudentAssignmentPage assignments={assignments} />
      )
    } else if(option === "Grades") {
      return(
        <div>Grades</div>
      )
    }
  }

  function infoClick(e:any) {
    setOption("Information");
  }

  function assignmentClick(e:any) {
    setOption("Assignments");
  }

  function gradesClick(e:any) {
    setOption("Grades");
  }

  return(
    <div>
      <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {params.courseName}
      </h3>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button onClick={infoClick} style={buttonStyle}>Information</button>
        <button onClick={assignmentClick} style={buttonStyle}>Assignments</button>
        <button onClick={gradesClick} style={buttonStyle}>Grades</button>
      </div>
      {courseInfo()}
    </div>
  )

}

export default StudentCoursePage;
