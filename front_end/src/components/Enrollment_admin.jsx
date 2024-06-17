import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import BlackLoadingSpinner from './BlackLoadingSpinner';
import axiosInstance from '../axios';

const EnrollmentAdmin = () => {
  const [subjects, setSubjects] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [sections, setSections] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    subject_id: '',
    instructor_id: '',
    section_id: '',
    school_year_id: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, instructorsRes, sectionsRes, schoolYearsRes] = await Promise.all([
          axiosInstance.get('/api/subjects'),
          axiosInstance.get('/api/instructors'),
          axiosInstance.get('/api/sections'),
          axiosInstance.get('/api/school_years')
        ]);

        setSubjects(subjectsRes.data);
        setInstructors(instructorsRes.data);
        setSections(sectionsRes.data);
        setSchoolYears(schoolYearsRes.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please check console for details.');
      }
    };

    fetchData();
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    console.log('Form submitted:', formData);
    
    try {
      const existingDataRes = await axiosInstance.post('/api/instructor-sections-handled/check-existence', formData);
      if (existingDataRes.data.exists) {
        setErrorMessage('Data Already Exists');
        return;
      }

      await axiosInstance.post('/api/instructor-sections-handled', formData);
      setSuccessMessage('Assigning Successful');
      alert('Instructor enrollment completed successfully');

    } catch (error) {
      console.error('Error enrolling instructor:', error);
      alert('Error enrolling instructor. Please try again.');
    }
  };

  if (loading) {
    return  <div className='relative flex align-middle justify-center text-center mx-auto my-auto'> <BlackLoadingSpinner /> </div>
  }

  return (
    <div className='flex'>
      <div className='container mx-auto p-5 m-4'>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 m-2 rounded-lg shadow-md flex items-center p-1 ml-[30px]" role="alert" style={{ maxWidth: '100rem' }}>
          <div className="flex-shrink-0">
            <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4 p-1 text-yellow-500" />
          </div>
          <div className="ml-3 text-s font-small">
            Please fill out the form carefully and double-check your information before submitting.
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 p-5'>
          <div className="lg:col-span-2 p-5">
            <div className="bg-white rounded-lg shadow-md p-3">
              <div className='p-5 flex justify-between'>
                <h3 className='-order-3 text-black'> Instructor Assigning to Subject and Section Form</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-5">
                {errorMessage && <p className="relative text-red-500 text-center text-[14px]">{errorMessage}</p>}
                {successMessage && <p className="relative text-green-500 text-center text-[14px]">{successMessage}</p>}

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject_id">Subject</label>
                  <select
                    id="subject_id"
                    name="subject_id"
                    value={formData.subject_id}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{`${subject.subject_code} - ${subject.title}`}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor_id">Instructor</label>
                  <select
                    id="instructor_id"
                    name="instructor_id"
                    value={formData.instructor_id}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map(instructor => (
                      <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="section_id">Section</label>
                  <select
                    id="section_id"
                    name="section_id"
                    value={formData.section_id}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section.id} value={section.id}>{section.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school_year_id">School Year</label>
                  <select
                    id="school_year_id"
                    name="school_year_id"
                    value={formData.school_year_id}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select School Year</option>
                    {schoolYears.map(schoolYear => (
                      <option key={schoolYear.id} value={schoolYear.id}>{schoolYear.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>   
    </div>
  );
};

export default EnrollmentAdmin;