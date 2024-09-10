import React from 'react'
import Header from '../components/Header';
import Select from 'react-select';
import { useState } from 'react';

const TeamMissionCreatePage = () => {

  const topics = [
    { value: "wakeup", label: "일찍 일어나기"},
    { value: "exercise", label: "운동하기"},
  ]

  const [selectedTopic, setSelectedTopic] = useState("");

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '1px solid #e2e8f0',
      borderRadius: 0,
      boxShadow: 'none',
      outline: 'none',
      '&:hover': {
        borderBottom: '1px solid #fd826a'
      },
      borderColor: 'none',
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#fd826a' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  }

  return (
    <div>
      <Header title={"벌금 통장"} color={"orange"}/>
      <div className='text-left p-12'>
        <div>
          <div className='text-xl font-bold mb-4'>이름</div>
          <input 
          placeholder='이름을 입력해주세요' 
          className='w-full p-2 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors mb-10' />
        </div>
        <div>
          <div className='text-xl font-bold mb-4'>미션당 벌금</div>
          <input 
          placeholder='벌금을 입력해주세요' 
          className='w-full p-2 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors mb-10' />
        </div>
        <div>
          <div className='text-xl font-bold mb-4'>주제 선택</div>
          <Select 
          options={topics}
          value={selectedTopic}
          style={customStyles}
          placeholder='주제를 선택해주세요'
          className="w-full mb-10"
          />
        </div>
        <div>
          <div className='text-xl font-bold mb-4'>기간</div>
          <input 
          placeholder='벌금을 입력해주세요' 
          className='w-full p-2 border-b border-gray-300 focus:border-orange-00 focus:outline-none transition-colors mb-10' />
        </div>
      </div>
    </div>
  )
}

export default TeamMissionCreatePage