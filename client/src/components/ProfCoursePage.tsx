import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './GridStyles';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
let optionsAssignment: any[] = [];
let optionsStudent: any[] = [];

const ProfCoursePage = (props :any) => {

  const params: {id: string, courseName: string} = useParams();
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");
  const [assignments, setAssignments] = useState<string[]>();
  const [students, setStudents] = useState<string[]>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  
  async function setSelectAssignmentOptions() {
    if (assignments) {
      assignments.forEach((assignment: any) => {
        optionsAssignment.push({
          value: assignment.title, label: assignment.title
        })
      });
    }
  }

  async function setSelectStudentOptions() {
    if (students) {
      students.forEach(student => {
        optionsStudent.push({
          value: student, label: student
        })
      });
    }
  }

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
    }).then(function (response: any) {
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

  async function handleGradeSubmit(e:any) {
    e.preventDefault()
    const assignment: string = e.target[0].value;
    const student_id: string = e.target[1].value;
    const grade: number = e.target[2].value;
    await axios.post(process.env.REACT_APP_SERVER + `/v1/professor/${params.id}/courses/${params.courseName}/asssignments/${assignment}`, {
      course_id: params.courseName,
      student_id: student_id,
      assignment_id: assignment,
      grade: grade
    }).then(function (response: any) {
      if (response.status === 200) {
        alert('Grade was successfully saved!')
        window.location.reload()
      } else {
        alert('Not able to add grade! Try again.\n' + response.data.message)
      }
    })
    /*  router.post('/:id/courses/:course_id/assignments/:assignment_id/grades', GradeComponent.add) */
  }

  const courseInfo = () => {
    if(option === "update") {
      return(<>             

        {(optionsAssignment.length > 0  && optionsStudent.length > 0) ?  <div style={{margin: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <form onSubmit={handleGradeSubmit}>
            <Select options={optionsAssignment}/><br/>
            <Select options={optionsStudent}/><br/>
            <input type="number" id="grade" placeholder="Input Grade"/><br/><br/>
            <button type="submit">Submit</button>
          </form>
        </div> : <p>Loading..</p>}</>
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
          setAssignments(response.data.assignments);
          setStudents(response.data.students);
        }
      } catch(error: any) {
        console.log(error);
      }
    }
    getCourseInfo();
    setSelectAssignmentOptions();
    setSelectStudentOptions();
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
  optionsAssignment = [];
  optionsStudent = [];
  setSelectAssignmentOptions();
  setSelectStudentOptions();
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
        <button onClick={updateClick} style={buttonStyle}>Add Grades</button>
        <button onClick={addClick} style={buttonStyle}>Add Assignment</button>
      </div>
      {courseInfo()}
    </div>
  )
}

export default ProfCoursePage;
