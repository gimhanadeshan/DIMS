import React,{useState} from 'react'
import { registerUser } from '../services/api';
import Mobitel from '../assets/mobitel.svg'
import Layout from '../components/Layout';
import BubblesBackground from '../components/BubblesBackground';
import { useNavigate } from 'react-router-dom'

const Register = () => {

const [user,setuser] = useState({
    name:"",
    email:"",
    password:""
});
const navigate = useNavigate();

const handlechange = (e) => {
    setuser({
        ...user,
        [e.target.name]: e.target.value})
}

const handlesubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await registerUser(user);
      alert("✅ Registered!", res.data)
    }catch(err){
      alert("❌ Error!", err.response.data || err.message)
    }
}

const handleAi = () => {
    navigate('/metamasklogin') 
  }

  return (
<Layout>
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <BubblesBackground count={15} />

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8">
            <img alt="Your Company" src={Mobitel} className="mx-auto h-10 w-auto" />

            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>

            <form onSubmit={handlesubmit} className="mt-8 space-y-6">

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Name
                </label>
                <input
                  name="name"
                  type="name"
                  value={user.name}
                  onChange={handlechange}
                  required
                  autoComplete="name"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-400 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handlechange}
                  required
                  autoComplete="email"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-400 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handlechange}
                  required
                  autoComplete="current-password"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-400 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Sign up
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-300">
              Already a member?{' '}
              <a href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Floating AI Assistant Button */}
        <button
          onClick={handleAi}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-400 transition-colors duration-200 animate-bounce"
          aria-label="AI Assistant"
        >
          <div className="relative group">
            <div
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-describedby="ai-tooltip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8.5 9.5c0-1.5 3-4 3-4s3 2.5 3 4M8.5 14.5c0 1.5 3 4 3 4s3-2.5 3-4M14.5 15l-1.5-3-3 1.5-1.5-3"
                />
              </svg>
            </div>

            <div
              id="ai-tooltip"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block 
                         bg-gray-800 text-white text-sm px-3 py-1 rounded-md 
                         after:content-[''] after:absolute after:top-full after:left-1/2
                         after:-translate-x-1/2 after:border-8 after:border-x-transparent 
                         after:border-b-transparent after:border-t-gray-800"
            >
              Metamask Login
              <span className="sr-only">(AI Help)</span>
            </div>
          </div>
        </button>
      </div>
    </Layout>
  )
}

export default Register
