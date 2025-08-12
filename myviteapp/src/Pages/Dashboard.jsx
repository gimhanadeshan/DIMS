import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Mobitel from '../assets/mobitel.svg'
import BubblesBackground from '../components/BubblesBackground';

const Dashboad = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setForm({
          name: res.data.user.name,
          email: res.data.user.email
        });
      })
      .catch((e) => {
        console.error("Error while getting data", e);
        navigate('/login');
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:4000/api/user/update", form, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setEditMode(false);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  return (
    <Layout>
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">

        <BubblesBackground count={15}/>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8">
        
          <img alt="Your Company" src={Mobitel} className="mx-auto h-10 w-auto" />
          
                      <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
                        Your account
                      </h2>
       

    
  
        {user ? (
          <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 mt-10'>
            <img
                    alt="User"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-20 w-20 rounded-full"
                  
                  />
            {!editMode ? (
              <div className="text-center mt-2">
                <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                <p className="text-sm text-white mt-1">{user.email}</p>
                <p className="text-sm text-white mt-1">{user.role}</p>
                <button
                  onClick={() => setEditMode(true)}
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                >
                  Edit
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-400 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-400 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">
                  Save
                </button>
              </form>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-base mt-10">No user found.</p>
        )}
      </div>
      </div>
      </div>
    </Layout>
  );
};

export default Dashboad;
