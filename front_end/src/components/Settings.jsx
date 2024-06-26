import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';

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
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Grade Submission Settings</h1>
      <div className="flex items-center">
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
  );
  
}

export default Settings;
