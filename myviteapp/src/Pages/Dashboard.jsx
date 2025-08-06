import React from 'react'
import Layout from '../components/Layout';

const Dashboard = () => {

    const role = localStorage.getItem("role");

  return (

    <Layout>

    <div>

     <h2>This is Dashboard</h2>

     {role === "admin" && <p>Wellcome admin!</p>}
     {role === "user" && <p>Wellcome user!</p>} 
     {role === "guest" && <p>Wellcome guest!</p>} 
      
    </div>

    </Layout>
    
  )
}

export default Dashboard
