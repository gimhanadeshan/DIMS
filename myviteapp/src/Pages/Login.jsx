import React, { useState } from 'react';
import { loginUser } from '../services/api';
import Layout from '../components/Layout';
import Mobitel from '../assets/mobitel.svg';
import BubblesBackground from '../components/BubblesBackground';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Toast from "../components/Toast";


const Login = () => {
  const [user, setuser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [toast, setToast] = useState(null); // {type, message}

  // Handle input change
  const handlechange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login form submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(user);
      console.log('✅ Logged in!', res.data);
      alert('✅ Logged in!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(`❌ Error! ${err.response?.data || err.message}`);
    }
  };

  // MetaMask connection
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setToast({
          type: "success",
          message: `🦊 Wallet Connected: ${accounts[0]}`,
        });
      } catch (error) {
        setToast({ type: "error", message: "User denied account access" });
      }
    } else {
      setToast({ type: "warning", message: "Please install MetaMask" });
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
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handlechange}
                  required
                  placeholder="example@gmail.com"
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
                  placeholder="*********"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-400 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-300">
              Not a member?{' '}
              <a href="/register" className="font-semibold text-blue-400 hover:text-blue-300">
                Sign up
              </a>
            </p>

      {/* <div className="text-white">
      {account && <p>🦊 Connected as: {account}</p>}
      </div> */}

          </div>
        </div>

        {/* Floating MetaMask Login Button */}
        <button
          onClick={connectWallet}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-400 transition-colors duration-200 animate-bounce"
          aria-label="MetaMask Login"
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
              MetaMask Login
              <span className="sr-only">(AI Help)</span>
            </div>
          </div>
        </button>
      </div>

{/* Toast */}
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}

    </Layout>
  );
};

export default Login;
