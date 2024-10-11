import React from 'react'

const BettingAvatar = ({member,size}) => {
  const avatarSize = size === "lg" ? "w-24 h-24" : "w-24 h-24"
  return (
    <img
    key={member.targetName}
    src={member.targetProfileImage}

  alt="Profile"
    className= {`${avatarSize} rounded-full border-4 border-gray-300`}
  />
  )
}

export default BettingAvatar