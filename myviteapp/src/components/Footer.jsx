import React from 'react';
import Mobitel from '../assets/mobitel.svg';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-700">
              This is my sample Authentication Application. made by Tharindu Malinga
            </p>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="home" className="text-sm text-gray-700 hover:text-gray-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-gray-600">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-gray-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-700 hover:text-gray-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700">
                Email: sltmobtel@gmail.com
              </li>
              <li className="text-sm text-gray-700">
                Phone: +94 (71) 9161426
              </li>
              <li className="text-sm text-gray-700">
                Address: Colombo, Srilanka
              </li><br/>
              <li>
                <img alt="Your Company" src={Mobitel} className="h-10 w-auto" />
              </li>
            </ul>
          </div>
        </div>

       
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;