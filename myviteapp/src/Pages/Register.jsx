import React,{useState} from 'react'
import { registerUser } from '../services/api';

const Register = () => {

const [user,setuser] = useState({
    name:"",
    email:"",
    password:""
});

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
      alert("❌ Error!", err.response.data)
    }
}
  return (
    <div>

        <h2>This is Registering</h2>

        <form onSubmit={handlesubmit}>
            <div>
                <labe>Name:</labe>
                <input type='name' name='name' placeholder='enter the name' onChange={handlechange} value={user.name} required/>
            </div>
            <div>
                <labe>Email:</labe>
                <input type='email' name='email' placeholder='enter the email' onChange={handlechange} value={user.email} required/>
            </div>
            <div>
                <labe>Password:</labe>
                <input type='password' name='password' placeholder='enter the password' onChange={handlechange} value={user.password} required/>
            </div>
            <div>
            <button type='submit'>Sign up</button>
            </div>
        </form>
      
    </div>
  )
}

export default Register
