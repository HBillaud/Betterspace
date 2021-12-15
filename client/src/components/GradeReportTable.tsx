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
const GradeReportTable = (props: {info: any}) => {


  const columns = React.useMemo(
      () => [
        {
          Header: 'Course ID',
          accessor: 'course_id', // accessor is the "key" in the data
        },
        {
          Header: 'Assignment',
          accessor: 'assignment',
        },
        {
          Header: 'Student',
          accessor: 'student',
        },
        {
          Header: 'Grade',
          accessor: 'grade',
        },
        {
          Header: 'Average Grade',
          accessor: 'averageGrade'
        },
      ],
      []
  )

  const info = props.info;

  const tableInstance = useTable({columns, data: info});

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

export default GradeReportTable;
