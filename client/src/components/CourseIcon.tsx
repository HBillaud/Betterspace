import React, { FC } from 'react'
interface CourseIconProps {
    courseName?: string;
}
const CourseIcon: FC<CourseIconProps> = ({courseName='unknown'}) => {
    return (
        <a href="/blank">
        <div>
        <img src={`https://via.placeholder.com/150/0000FF/000000?text=${courseName}`} alt="" />
        </div>
        </a>
    )
}
export default CourseIcon;