import React from 'react'
import Avatar from './Avatar'

const AvatarList = ({memberList}) => {
  return (
    memberList.map((member) => (
        <Avatar key={member.id} member={member}/>
        ))
  )
}

export default AvatarList