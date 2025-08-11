import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios.get('http://localhost:4000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      } else {
        window.location.href = '/login';
      }
    })
    .catch(err => {
      console.error(err);
      window.location.href = '/login';
    });
  }, []);

  return (
    <div>
      {user ? <h1>Welcome {user.name}</h1> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
