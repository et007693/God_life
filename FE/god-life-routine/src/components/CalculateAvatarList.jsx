import React from 'react'
import CalculateAvatar from './CalculateAvatar'


const CalculateAvatarList = ({memberList}) => {
  return (
    memberList.map((member) => (
        <CalculateAvatar key={member.memberProfileImage} member={member}/>
        ))
  )
}

export default CalculateAvatarList