import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface CourseIconProps {
    courseName?: string;
}
const CourseIcon: FC<CourseIconProps> = ({courseName='unknown'}) => {
    return (
        <a href="/login">
        <div>
        <img src={`https://via.placeholder.com/150/0000FF/000000?text=${courseName}`} alt="" />
        </div>
        </a>
    )
}
export default CourseIcon;
