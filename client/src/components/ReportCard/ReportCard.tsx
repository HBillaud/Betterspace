import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import { CircularProgress } from '@material-ui/core';

const ReportCard = () => {
    const history: any = useHistory();
    const params: {id: string} = useParams();
    const [grades, setGrades] = useState();
    const [avgFilter, setAvgFilter] = useState(0);
    const [gradeFilter, setGradeFilter] = useState(0);
    const [sortCourses, setSortCourses] = useState<number>(1);

    function handleAvgFilter(e: any) {
        if (e.target.value === 'Above') {
            setAvgFilter(1);
        } 
        else if (e.target.value === 'Below') {
            setAvgFilter(-1);
        }
        else {
            setAvgFilter(0);
        }
    }
    function handleGradeFilter(e: any) {
        if (e.target.value === 'A') {
            setGradeFilter(90);
        } 
        else if (e.target.value === 'B') {
            setGradeFilter(80);
        }
        else if (e.target.value === 'C') {
            setGradeFilter(70);
        }
        else if (e.target.value === 'D') {
            setGradeFilter(60);
        }
        else {
            setGradeFilter(0);
        }
    }

    useEffect(() => {
        async function getGradeInfo() {
          try {
            setGrades(undefined);
            console.log(avgFilter, gradeFilter);
            const response: any = await axios.post(process.env.REACT_APP_SERVER + `/v1/student/${params.id}/reportCard/`, {
                withCredentials: true,
                avgFilter: avgFilter,
                gradefilter: gradeFilter,
                sortCourses: sortCourses,
            });
            setGrades(response.data);

          } catch(error: any) {
            console.log(error);
          }
        }
        getGradeInfo();

      }, [params.id, avgFilter, gradeFilter, sortCourses])
      return (
          <div>
            <input type="button" value="Go back!" onClick={() => {
                history.push({
                  pathname: `/v1/student/${params.id}`
                })}}/>
              <h3  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Report Card</h3>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <select name="desiredGrade" id="grade" onChange={handleGradeFilter}>
                  <option value="">Select desired grade</option>
                  <option value="A">90-100</option>
                  <option value="B">80-90</option>
                  <option value="C">70-80</option>
                  <option value="D">60-70</option>
            </select>
            <select name="average" id="avgGrade" onChange={handleAvgFilter}>
                  <option value="">Below/Above Average Grades</option>
                  <option value="Above">Above Average</option>
                  <option value="Below">Below Average</option>
            </select>
            </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {grades ? <Table grades={grades} sortCourses={sortCourses} setCourses={setSortCourses}/> : <div><CircularProgress style={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: 'auto'}} /> <p> Loading... </p></div>}
            </div>
          </div>
      )
}

export default ReportCard;