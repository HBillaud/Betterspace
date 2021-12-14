import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import ReportTable from './ReportTable';

const CourseReport = () => {
    const history: any = useHistory();
    const url = window.location.href;
    const params: {id: string} = useParams();
    const [courses, setCourses] = useState();
    const [courseList, setList] = useState<any[]>([]);
    const [profList, setProfList] = useState<any[]>([]);
    const [desiredCourses, setDesiredC] = useState<any[]>([]);
    const [desiredProfs, setDesiredProfs] = useState<any[]>([]);
    const [sortCourses, setSortCourses] = useState<number>(1);
    const [sortProfessors, setSortProfessors] = useState<number>(0);

    function handleProfs(e: any) {
        var result = [];
        var options = e && e.target;
        var opt;
      
        for (var i=0, iLen=options.length; i<iLen; i++) {
          opt = options[i];
      
          if (opt.selected) {
            result.push(opt.value || opt.text);
          }
        }
        if (result[0] == 'Select desired professors') {
            setDesiredProfs([]);
        }
        else {
            setDesiredProfs(result);
        }
    }
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
            setDesiredC([]);
        }
        else {
            setDesiredC(result);
        }
    }
    useEffect(() => {
        async function getCourseInfo() {
          try {
            const filtered: any = await axios.post(process.env.REACT_APP_SERVER + `/v1/student/${params.id}/courses`, {
                withCredentials: true,
                courses: [],
                profs: [],
            });
            const response: any = await axios.post(process.env.REACT_APP_SERVER + `/v1/student/${params.id}/courses/`, {
                withCredentials: true,
                courses: desiredCourses,
                profs: desiredProfs,
                sortCourses: sortCourses,
                sortProfs: sortProfessors,
              });
            const respData: any[] = response.data;
            const filteredData: any[] = filtered.data;
            const course_ids = filteredData.map(el => {
                return el._id;
            })
            setList(course_ids);
            const profs = filteredData.map(el => {
                if(el.professor)
                return el.professor.lastname;
            })
            const uniqueProfs = profs.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            setProfList(uniqueProfs);
            if (sortProfessors === 1) {
                setCourses(response.data.filter(((data: any) => data.professor != null)).sort((a: any,b: any) => a.professor.lastname > b.professor.lastname ? 1 : -1))
            } else if (sortProfessors == -1)  {
                setCourses(response.data.filter(((data: any) => data.professor != null)).sort((a: any,b: any) => a.professor.lastname > b.professor.lastname ? -1 : 1))
            }
            else {
                setCourses(response.data.filter((data: any) => data.professor != null));
            }
            // sort by professor : .sort((a: any,b: any) => a.professor.lastname > b.professor.lastname ? 1 : -1
          } catch(error: any) {
            console.log(error);
          }
        }
        getCourseInfo();

      }, [params.id, courses, sortCourses, sortProfessors])
      return (
          <div>
            <input type="button" value="Go back!" onClick={() => {
                if (url.includes("professor")) {
                    history.push({
                        pathname: `/v1/professor/${params.id}`
                    })
                } else {
                history.push({
                  pathname: `/v1/student/${params.id}`
                })}}}/>
              <h3  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Course List</h3>
              <select name="desiredCourses" id="courses" multiple onChange={handleCourses}>
                  <option value="">Select desired courses</option>
            {courseList.map(function(course) {
                return (<option value={course}>{course}</option>);
            })}
            </select>
            <select name="desiredProfessors" id="professors" multiple onChange={handleProfs}>
                  <option value="">Select desired professors</option>
            {profList.map(function(prof) {
                return (<option value={prof}>{prof}</option>);
            })}
            </select>
            {courses && <ReportTable courses={courses} sortCourses={sortCourses} sortProfs={sortProfessors} setCourses={setSortCourses} setProfs={setSortProfessors} id={params.id} prof={!url.includes("professor")}/>}
          </div>
      )
}

export default CourseReport;


