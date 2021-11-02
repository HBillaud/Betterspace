import React from 'react'
import HomePage from './HomePage'
export default {
     title: 'Tag title',
     component: HomePage
}
export const Basic = () => (
     <HomePage courses={[]}/>
)
export const Second = () => (
     <HomePage name="Julia" courses={['cs408','cs348','com217', 'soc100']} />
)
