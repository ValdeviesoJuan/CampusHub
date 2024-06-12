import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm hover:text-orange-600">&copy; 2024 Student Portal</p>
        <nav className="flex space-x-4">
          <a href="#" className="text-white hover:text-orange-600">Privacy Policy</a>
          <a href="#" className="text-white hover:text-orange-600">Terms of Service</a>
          <a href="#" className="text-white hover:text-orange-600">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
