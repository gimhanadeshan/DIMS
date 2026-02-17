import React,{useState} from 'react'
import { registerUser } from '../services/api';
import Mobitel from '../assets/mobitel.svg'
import Layout from '../components/Layout';
import BubblesBackground from '../components/BubblesBackground';
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'; 

const Register = () => {

const [user,setuser] = useState({
    name:"",
    email:"",
    password:""
});

 const navigate = useNavigate();
 const [account, setAccount] = useState("");

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

  // MetaMask connection
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected Account:", accounts[0]);
        alert(`✅ Wallet Connected: ${accounts[0]}`);
        navigate('/#');
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

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
                  placeholder='example'
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
                  placeholder='example@gmail.com'
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
                  placeholder='********'
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

{/* <div className="text-white">
      {account && <p>🦊 Connected as: {account}</p>}
      </div> */}

          </div>
        </div>

        {/* Floating AI Assistant Button */}
        <button
          onClick={connectWallet}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-400 transition-colors duration-200 animate-bounce"
          aria-label="AI Assistant"
        >
          <div className="relative group">
            <div
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-describedby="ai-tooltip"
            >
              <div className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <span role="img" aria-label="MetaMask" className="text-xl">🦊</span>
              </div>
              
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
