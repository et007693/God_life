import React from 'react'
import CalculateAvatar from './CalculateAvatar'


const CrownList = ({member}) => {
  return (
    <CalculateAvatar key={member.memberProfileImage} member={member}/>
  )
}

export default CrownList