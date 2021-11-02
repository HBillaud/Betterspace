import React, { FC } from 'react'
interface CourseIconProps {
    courseName?: string;
}
const CourseIcon: FC<CourseIconProps> = ({courseName='unknown'}) => {
    return (
        <div>
        <img src={`https://via.placeholder.com/150/0000FF/808080?text=${courseName}`} alt="" />
        </div>

    )
}
export default CourseIcon;