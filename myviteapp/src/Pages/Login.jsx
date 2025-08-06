import React,{useState} from 'react'
import { loginUser } from '../services/api'
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

    <div>

        <h1>This is Login</h1>

        <form onSubmit={handlesubmit}>
            <div>
                <label>Email:</label>
                <input type='email' name='email' placeholder='enter the email' onChange={handlechange} value={user.email} required/><br />
            </div>
            <div>
                <label>Password:</label>
                <input type='password' name='password' placeholder='enter the password' onChange={handlechange} value={user.password} required/><br />
            </div>
            <div>
                <button type='submit'>Sign in</button>
            </div>
        </form>
      
    </div>
  )
}

export default Login
