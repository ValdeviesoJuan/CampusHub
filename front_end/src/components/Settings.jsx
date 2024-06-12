import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faUserLock, faSignOutAlt, faBell, faPrint, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function StudentSettings() {
  // State for system theme
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode is already enabled in localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    // If dark mode is enabled, return true; otherwise, return false
    return savedDarkMode === 'true';
  });

  // Function to toggle system theme
  const toggleDarkMode = () => {
    // Toggle the state of dark mode
    setDarkMode(!darkMode);
  };

  // Effect to update localStorage when dark mode changes
  useEffect(() => {
    // Update localStorage with the current state of dark mode
    localStorage.setItem('darkMode', darkMode);
    // Add or remove 'dark' class from the document body based on darkMode state
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Placeholder function for changing password
  const changePassword = () => {
    // Add logic here for changing password
    console.log("Change password");
  };

  // Placeholder function for logging out
  const logout = () => {
    // Add logic here for logging out
    console.log("Logout");
  };

  // Placeholder function for managing notifications
  const manageNotifications = () => {
    // Add logic here for managing notifications
    console.log("Manage Notifications");
  };

  // Function for printing schedule
  const printSchedule = () => {
    window.print();
  };

  // Placeholder function for additional features
  const handleFeatureClick = (feature) => {
    console.log(`Clicked on ${feature}`);
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 h-full max-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-6">Student Portal Settings</h2>
      
      {/* Button for toggling system theme */}
      <button onClick={toggleDarkMode} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4">
        <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      
      {/* Button for changing password */}
      <button onClick={changePassword} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4">
        <FontAwesomeIcon icon={faUserLock} className="mr-2" />
        Change Password
      </button>
      
      {/* Button for logging out */}
      <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </button>

      {/* Button for managing notifications */}
      <button onClick={manageNotifications} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4">
        <FontAwesomeIcon icon={faBell} className="mr-2" />
        Manage Notifications
      </button>

      {/* Button for printing schedule */}
      <button onClick={printSchedule} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4">
        <FontAwesomeIcon icon={faPrint} className="mr-2" />
        Print Schedule
      </button>

      {/* Placeholder buttons for additional features */}
      <button onClick={() => handleFeatureClick("Feature 1")} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-4">
        Feature 1
      </button>

      <button onClick={() => handleFeatureClick("Feature 2")} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mb-4">
        Feature 2
      </button>
    </div>
  );
}

export default StudentSettings;
