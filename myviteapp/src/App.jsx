import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import MetaMaskLogin from './Pages/MetaMaskLogin'
import Homepage from './Pages/Homepage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/metamasklogin" element={<MetaMaskLogin/>}/>
      </Routes>
    </Router>
  )
}

export default App
