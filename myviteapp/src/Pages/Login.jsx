import React,{useState} from 'react'
import { loginUser } from '../services/api'
import Layout from '../components/Layout'
import Mobitel from '../assets/mobitel.svg'
const Login = () => {

   const [user,setuser] = useState({
    email:"",
    password:""
   })

   const handlechange = (e) => {
    setuser({
        ...user,
        [e.target.name]: e.target.value})
   }

   const handlesubmit = async (e) => {
    e.preventDefault();

    try{
        const res = await loginUser(user);
        alert("✅ Logged in!", res.data)

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        window.location.href = "/dashboard";
    }catch(err){
        alert("❌ Error!", err.response.data);
    }

   }

  return (

<Layout>


    <div className="relative isolate overflow-hidden bg-blue-50 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
          <img
            alt="Your Company"
            src={Mobitel}
            className="mx-auto h-10 w-auto"
          />

          
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-200">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            
          <form onSubmit={handlesubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handlechange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handlechange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-300 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-gray-700 hover:text-blue-600">
              Sign up
            </a>
          </p>
        </div>
      </div>

 </Layout>     

  )
}

export default Login
