import './App.css'
import { Route, Routes } from 'react-router-dom'
import Test from './components/test'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {
  
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />} >
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/' element={<Test />} />
        </Route>
        <Route path='/sign-in' element={<Login />}/>
        <Route path='/register' element={<Register />} />
        
      </Routes>
    </div>
  )
}

export default App
