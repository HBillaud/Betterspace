import React from 'react'
import Tag from './Tag'
export default {
     title: 'Tag title',
     component: Tag
}
export const Basic = () => (
     <Tag />
)
export const Second = () => (
     <Tag title="My second tag" />
)
