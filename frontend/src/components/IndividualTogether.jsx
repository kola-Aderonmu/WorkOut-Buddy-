import React from 'react'

const IndividualTogether = () => {
  
     return (
       <div className="individual-together-page">
         <h1 className="text-xl mb-20">Individual - Together</h1>
         <div className="content">
           <h2>Team up for your health</h2>
           <p>
             Exercise with your friends and people around the world as you build
             up your daily step count
           </p>
           <button
             className="get-started-button pt-2"
             onClick={() => alert("This feature is still under construction.")}
           >
             Get Started
           </button>
         </div>
       </div>
     );
  
}

export default IndividualTogether