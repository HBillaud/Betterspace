import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import styled from 'styled-components'
const Styles = styled.div`
padding: 1rem;


table {
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
}`
const ReportTable = (props: {courses: any, sortCourses: number, sortProfs: number, setCourses: any, setProfs: any, id: string, prof: boolean}) => {
    function updateCourseSort() {
      if (props.sortCourses === 0) {
        props.setCourses(1);
        props.setProfs(0);
      }
      else if (props.sortCourses === 1) {
        props.setCourses(-1);
        props.setProfs(0);
      }
      else {
        props.setCourses(0);
      }
    }
    function updateProfSort() {
      if (props.sortProfs === 0) {
        props.setCourses(0);
        props.setProfs(1);
      }
      else if (props.sortProfs === 1) {
        props.setCourses(0);
        props.setProfs(-1);
      }
      else {
        props.setProfs(0);
      }
    }
    async function addStudentToCourse(e: string){
      try {
        const response = await axios.put(process.env.REACT_APP_SERVER + `/v1/student/${props.id}/`, {
          course_id: e,
        });
        if (response.status === 200) {
          alert(`Student successfully added to course ${e}`)
        }
      }
      catch (error: any) {
        console.log(error, error.toString().includes('500'));
        if (error.toString().includes('500')) {
          alert('You are already enrolled in this course.')
        } else {
          alert(error);

        }
        //console.log(error)
      }
    }
    const columns = React.useMemo(
        () => [
          {
            Header: 'Course ID',
            accessor: '_id', // accessor is the "key" in the data
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Professor',
            accessor: 'professor.lastname',
          },
        ],
        []
    )
    const courses = props.courses;
    // @ts-ignore
    const tableInstance = useTable({columns, data: courses});

          const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
          } = tableInstance;
    return (
        <Styles>
        <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                  {column.getHeaderProps().key === 'header__id' &&
                  <button onClick={updateCourseSort}> {props.sortCourses === 1 && 'V'} {props.sortCourses === -1 && '^'} {props.sortCourses === 0 && '>'}</button>}
                  {column.getHeaderProps().key === 'header_professor.lastname' &&
                  <button onClick={updateProfSort}> {props.sortProfs === 1 && 'V'} {props.sortProfs === -1 && '^'} {props.sortProfs === 0 && '>'} </button>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <>
              {props.prof && <button onClick={() => addStudentToCourse(row.cells[0].value)}> Add this course </button>}

              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>
                      {// Render the cell contents
                      cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>

              </>

            )
          })}
        </tbody>
      </table>
      </Styles>
    )

}
export default ReportTable;
