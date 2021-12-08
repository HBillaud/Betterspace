import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './GridStyles';
import axios from 'axios';

const ProfCoursePage = (props :any) => {

  const params: {id: string, courseName: string} = useParams();
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");

  const courseInfo = () => {
    if(option === "update") {
      return(
        <div style={{margin: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          update grades
        </div>
      )
    } else if(option === "add") {
      return(
        <div style={{margin: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>add</div>
      )
    } else {
      return(
        <div style={{margin: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{description}</div>
      )
    }
  }

  useEffect(() => {
    async function getCourseInfo() {
      try {
        const response: any = await axios.get(process.env.REACT_APP_SERVER + `/v1/student/${params.id}/courses/${params.courseName}`, { withCredentials: true });
        if(response.status == 200) {
          setDescription(response.data.description);
        }
      } catch(error: any) {
        console.log(error);
      }
    }
    getCourseInfo();
  }, [])

  const buttonStyle = {
    color: "white",
    background: "blue",
    width: "20%",
    padding: "1%",
    margin: "20px",
    cursor: "pointer"
}

function updateClick(e:any) {
  setOption("update");
}

function addClick(e:any) {
  setOption("add");
}

function assignmentClick(e:any) {
  setOption("assignment");
}

  return(
    <div>
      <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {params.courseName}
      </h3>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button onClick={assignmentClick} style={buttonStyle}>Course Description</button>
        <button onClick={updateClick} style={buttonStyle}>Update Grades</button>
        <button onClick={addClick} style={buttonStyle}>Add Assignment</button>
      </div>
      {courseInfo()}
    </div>
  )
}

export default ProfCoursePage;
