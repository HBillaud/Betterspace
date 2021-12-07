import React, { useEffect, useState } from 'react';

const ProfCoursePage = (props :any) => {

  const params: {courseName: string} = useParams();

  return(
    <div>
      <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {params.courseName}
      </h3>  
    </div>
  )
}

export default ProfCoursePage;
