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
import AppContainer from './components/layout/AppContainer'

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmailPrompt />} />
      <Route path="/email/verify" element={<VerifyEmailPrompt />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      <Route path="/password/forgot" element={<ForgetPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />

      {/* Protected Routes Container */}
      <Route element={<AppContainer />}>
        {/* Place protected routes (e.g., /dashboard, /settings) here */}
      </Route>
    </Routes>
  )
}

export default App
