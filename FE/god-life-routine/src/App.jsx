import { useState } from 'react'
import './App.css'
import RegistPlacePage from './pages/RegistPlacePage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistPlacePage/>}/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
