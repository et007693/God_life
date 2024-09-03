import { useState } from 'react'
import './App.css'
import RegistPlacePage from './pages/RegistPlacePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegistPlacePage/>
    </>
  )
}

export default App
