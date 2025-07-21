import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="text-xl font-bold">📸 My Photos</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/gallery" className="hover:text-gray-400">Gallery</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;

