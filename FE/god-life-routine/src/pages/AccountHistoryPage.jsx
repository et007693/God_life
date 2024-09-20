import React from 'react'
import Header from '../components/Header'
import AccountHistoryList from '../components/AccountHistoryList'



const AccountHistoryPage = () => {
  
  return (
    <div>
      <Header title={"거래 내역"} color={"orange"}/>
      <div className='mt-24 text-left pl-4'>드롭다운</div>

      <AccountHistoryList />

    </div>
  )
}

export default AccountHistoryPage