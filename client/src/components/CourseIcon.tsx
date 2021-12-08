import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface CourseIconProps {
    courseName?: string;
    id?: string;
}
const CourseIcon: FC<CourseIconProps> = ({courseName='unknown', id='unknown'}) => {

  const history = useHistory();


  function handleClick(e:any) {
    let path = `/v1/student/${id}/${courseName}`;
    if(sessionStorage.getItem('professor') === "true") {
      path = `/v1/professor/${id}/${courseName}`;
    }
    history.push({
      pathname: path
    });
  }
    return (
        <a href="">
          <div onClick={handleClick}>
            <img src={`https://via.placeholder.com/150/0000FF/000000?text=${courseName}`} alt="" />
          </div>
        </a>
    )
}
export default CourseIcon;
