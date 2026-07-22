import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import VerifyEmail from './pages/VerifyEmail'
import VerifyEmailPrompt from './pages/VerifyEmailPrompt'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email/verify" element={<VerifyEmailPrompt />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      <Route path="/password/forgot" element={<ForgetPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
