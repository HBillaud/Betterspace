import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './GridStyles';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfCoursePage = (props :any) => {

  const params: {id: string, courseName: string} = useParams();
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  async function handleAssignmentSubmit(e:any) {
    e.preventDefault()
    const title: string = e.target[0].value;
    const description: string = e.target[1].value;
    const due_date: string = e.target[2].value;
    const course: string= `${params.courseName}`;
    await axios.post(process.env.REACT_APP_SERVER + `/v1/professor/${params.id}/courses/${params.courseName}/assignments`, {
      title: title,
      description: description,
      due_date: due_date,
      course: course,
    }) .then(function (response: any) {
      if (response.status === 200) {
        alert('Assignment successfully created!')
        window.location.reload();
      } else {
        alert('Invalid data! Assignment could not be created.\n' + response.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })

  }

  const courseInfo = () => {
    if(option === "update") {
      return(
        <div style={{margin: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          update grades
        </div>
      )
    } else if(option === "add") {
      return(
        <div style={{margin: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <form onSubmit={handleAssignmentSubmit}>
            <h3>Create an assignment</h3>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title"/><br/><br/>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description"/><br/><br/>
            <label htmlFor="date">Due Date:</label>
            <DatePicker selected={startDate} onChange={(date: Date | null) => setStartDate(date)} />
            <button type="submit">Submit</button>
          </form>
        </div>
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
