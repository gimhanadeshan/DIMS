import React from 'react'
import Layout from '../components/Layout'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Mobitel from '../assets/SLTMobitel-Logo-Vector.jpg'
import BubblesBackground from '../components/BubblesBackground'

const Homepage = () => {
  return (

     <Layout>
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">

      <BubblesBackground count={10}/>
   
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-green-400">
Why DIMS?
</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                A better System
              </h1>
             <p className="mt-6 text-xl/8 text-white">
A secure and transparent decentralized identity system is essential for safeguarding user data and ensuring only authorized access. DIMS integrates seamlessly with modern frameworks and blockchain technology to deliver unmatched privacy, security, and control.
</p>
</div>
</div>
</div>
<div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
  <img
    alt="Authentication system interface"
    src={Mobitel}
    className="w-3xl max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-190"
  />
</div>
<div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
  <div className="lg:pr-4">
    <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
      <ul role="list" className="mt-8 space-y-8 text-gray-600">
        <li className="flex gap-x-3  text-gray-400">
          <span>
            <strong className="font-semibold text-green-400">Easy Integration.</strong> Seamlessly connects with React, Node.js, and other modern frameworks. Effortlessly link to your backend and Ethereum smart contracts.

          </span>
        </li>
        <li className="flex gap-x-3 text-gray-400">
          <span>
            <strong className="font-semibold text-green-400">Secure by Design.</strong> Implements best security practices — Ethereum smart contracts, encrypted APIs, role-based access, and immutable audit trails.

          </span>
        </li>
        <li className="flex gap-x-3 text-gray-400">
          <span>
            <strong className="font-semibold text-green-400">Session & Token Support.</strong> Offers both session-based and token-based (JWT) authentication for flexibility in frontend and mobile apps.
          </span>
        </li>
      </ul>
      
      <h2 className="mt-16 text-2xl font-bold tracking-tight text-white">No server? No problem.</h2>
      <p className="mt-6 text-white">
       Highly customizable for startups, enterprises, and developers. Extend it to support multi-signature approvals, decentralized verification, and Web3 integrations.
</p>

            </div>
          </div>
        </div>
      </div>
    </div>

    </Layout>
    
  )
}

export default Homepage
