import { useState } from 'react' 
import './App.css'

// Public Routes
import publicRoutes from './router/routes/publicRoutes'


// Router Components
import Router from './router/routes/Router'

function App() { 
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])
  console.log("AllRoute: ", allRoutes)
  return (
    <Router allRoutes={allRoutes} />
  )
}

export default App
