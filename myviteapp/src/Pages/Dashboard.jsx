import React from 'react'

const Dashboard = () => {

    const role = localStorage.getItem("role");

  return (
    <div>

     <h2>This is Dashboard</h2>

     {role === "admin" && <p>Wellcome admin!</p>}
     {role === "user" && <p>Wellcome user!</p>} 
     {role === "guest" && <p>Wellcome guest!</p>} 
      
    </div>
  )
}

export default Dashboard
