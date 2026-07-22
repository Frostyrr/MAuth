import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgetPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
