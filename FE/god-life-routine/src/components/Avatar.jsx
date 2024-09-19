import React from 'react'

const Avatar = ({member,size}) => {
  const avatarSize = size === "lg" ? "w-24 h-24" : "w-16 h-16"
  return (
    <img
    key={member.id}
    src={member.profileImage}
  alt="Profile"
    className= {`${avatarSize} rounded-full border-4 border-gray-300`}
  />
  )
}

export default Avatar