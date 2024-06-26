import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPrint, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function Settings() {
  const [isGradeSubmissionOpen, setIsGradeSubmissionOpen] = useState(false); 

  useEffect(() => {
    fetchAdminSettings();
  }, []);

  const fetchAdminSettings = () => {
    axiosInstance.get('/api/admin-settings')
      .then(response => {
        const { is_grade_submission_open } = response.data;
        setAllowGradeSubmission(is_grade_submission_open);

      })
      .catch(error => {
        console.error('Error fetching admin settings:', error);
      });
  };
  
  const handleToggleGradeSubmission = () => {
    axiosInstance.put('/api/admin-settings', { is_grade_submission_open : !isGradeSubmissionOpen })
      .then(response => {
        console.log('Admin settings updated successfully:', response.data);
        setIsGradeSubmissionOpen(!isGradeSubmissionOpen);
        
      })
      .catch(error => {
        console.error('Error updating admin settings:', error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 h-full max-h-screen bg-slate-100 relative overflow-hidden">

    <p className='text-2xl font-bold relative top-[-15%] left-[-45%]'>
      Admin Settings
    </p>

      <p className='text-m relative top-[-7%] bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-5 rounded-lg shadow-md flex items-center p-1'>
          <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4 mr-2 text-yellow-500" />
          Remember to be cautious when enabling the allow grade submission option.
        </p>  

      <div className='bg-slate-200 w-[400px] h-[300px] rounded-2xl text-center relative top-[-7%] shadow-2xl mt-4'>
      <h1 className="text-2xl font-bold mb-4 relative top-[12%]">Grade Submission Settings</h1>
      <div className="flex items-center justify-center relative top-[32%]">
        <label htmlFor="toggleGradeSubmission" className="mr-4">Allow Grade Submission:</label>
        <div className="relative">
          <input
            type="checkbox"
            id="toggleGradeSubmission"
            className="toggle-checkbox"
            checked={isGradeSubmissionOpen}
            onChange={handleToggleGradeSubmission}
          />
          <label htmlFor="toggleGradeSubmission" className="toggle-label">
            <span className={`toggle-button ${isGradeSubmissionOpen ? 'toggle-button-on' : ''}`}></span>
          </label>
        </div>
        <span className="ml-2">{isGradeSubmissionOpen ? 'Enabled' : 'Disabled'}</span>
      </div>
      </div>
    </div>
  );
  
}

export default Settings;