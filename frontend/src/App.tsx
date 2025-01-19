import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { AdminPanel } from './components/AdminPanel'
import AuthProvider from './components/AuthProvider'
import { CheckFile } from './components/CheckFile'

function App() {
  
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoutes allowRoles={['admin', 'user']} />} >
            <Route path='/dashboard' element={<Dashboard />}/>
          </Route>
          <Route element={<ProtectedRoutes allowRoles={['admin']} />} >
            <Route path='/admin' element={<AdminPanel />} />
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route path='/sign-in' element={<Login />}/>
          <Route path='/check/file/:param' element={<CheckFile />}/>
          <Route path='/register' element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
