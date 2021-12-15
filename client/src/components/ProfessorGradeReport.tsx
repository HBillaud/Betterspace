import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useStyles from './GridStyles';
import GradeReportTable from './GradeReportTable';

const ProfessorGradeReport = (props :any) => {
  const params: {id: string} = useParams();

  const [tableData, setTableData] = useState<any[]>([]);
  const [courseList, setList] = useState<any[]>([]);
  const [assignmentList, setAssignmentList] = useState<any[]>([]);
  const[studentList, setStudentList] = useState<any[]>([]);
  const [desiredCourses, setDesiredCourses] = useState<any[]>([]);
  const [desiredAssignments, setDesiredAssignments] = useState<any[]>([]);
  const [desiredStudents, setDesiredStudents] = useState<any[]>([]);

  function handleCourses(e: any) {
      var result = [];
      var options = e && e.target;
      var opt;
      for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if (opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      if (result[0] == 'Select desired courses') {
          setDesiredCourses([]);
      }
      else {
          setDesiredCourses(result);
      }
  }

  function handleAssignments(e: any) {
      var result = [];
      var options = e && e.target;
      var opt;
      for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if (opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      if (result[0] == 'Select desired assignments') {
          setDesiredAssignments([]);
      }
      else {
          setDesiredAssignments(result);
      }
  }

  function handleStudents(e: any) {
      var result = [];
      var options = e && e.target;
      var opt;
      for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];
        if (opt.selected) {
          result.push(opt.value || opt.text);
        }
      }
      if (result[0] == 'Select desired students') {
          setDesiredStudents([]);
      }
      else {
          setDesiredStudents(result);
      }
  }

  useEffect(() => {
      async function getGradeReportInfo() {
        try {
          const filtered: any = await axios.get(process.env.REACT_APP_SERVER + `/v1/professor/${params.id}/courses`, { withCredentials: true });
          const resp: any = await axios.post(process.env.REACT_APP_SERVER + `/v1/professor/${params.id}/courses`,
            {
              withCredentials: true,
              id: params.id,
              courses: desiredCourses,
              assignments: desiredAssignments,
              students: desiredStudents
            }
          );
          const tableData: any[] = resp.data;
          setTableData(tableData);
          const selectData: any[] = filtered.data;
          const course_ids = selectData.map(el => {
              return el._id;
          })
          setList(course_ids);
          const courseAssignments = selectData.map(course => {
            return course.assignments;
          });
          let assignmentTitles: any[] = [];
          for(var i = 0; i < courseAssignments.length; i++) {
            const current = courseAssignments[i];
            for(var j = 0; j < current.length; j++) {
              assignmentTitles.push(current[j].title);
            }
          }
          setAssignmentList(assignmentTitles);
          const courseStudents = selectData.map(course => {
            return course.students;
          });
          let studentNames: any[] = [];
          for(var i = 0; i < courseStudents.length; i++) {
            const current = courseStudents[i];
            for(var j = 0; j < current.length; j++) {
              studentNames.push(current[j].lastname);
            }
          }
          const uniqueStudents = studentNames.filter(function(item, pos, self) {
              return self.indexOf(item) == pos;
          })
          setStudentList(uniqueStudents);
        } catch(error: any) {
          console.log(error);
        }
      }

      getGradeReportInfo();
  }, [desiredCourses, desiredAssignments, desiredStudents])

  return(
    <div>
      <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        Grades for your Assignments
      </h3>
      <select name="desiredCourses" id="courses" multiple onChange={handleCourses}>
          <option value="">Select desired courses</option>
          {courseList.map(function(course) {
            return (<option value={course}>{course}</option>);
          })}
      </select>
      <select name="desiredAssignments" id="assignments" multiple onChange={handleAssignments}>
          <option value="">Select desired assignments</option>
          {assignmentList.map(function(assignment) {
            return (<option value={assignment}>{assignment}</option>);
          })}
      </select>
      <select name="desiredStudents" id="students" multiple onChange={handleStudents}>
          <option value="">Select desired students</option>
          {studentList.map(function(student) {
            return (<option value={student}>{student}</option>);
          })}
      </select>
      <GradeReportTable info={tableData} />
    </div>
  );
}

export default ProfessorGradeReport;
