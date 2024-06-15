import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPrint, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axios';

const EnrollmentForm = () => {
  const [programs, setPrograms] = useState([]);
  const [yearLevels, setYearLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const [formData, setFormData] = useState({
    program_id: '',
    year_level_id: '',
    semester_id: '',
    section_id: '',
    school_year_id: ''
  });

//   useEffect(() => {
//     // Fetch programs, year levels, semesters, sections, and school years from the API
//     const fetchData = async () => {
//         try {
//             const programsResponse = await axiosInstance.get('/api/programs');
//             const yearLevelsResponse = await axiosInstance.get('/api/year_levels');
//             const semestersResponse = await axiosInstance.get('/api/semesters');
//             const sectionsResponse = await axiosInstance.get('/api/sections');
//             const schoolYearsResponse = await axiosInstance.get('/api/school_years');

//             setPrograms(programsResponse.data);
//             setYearLevels(yearLevelsResponse.data);
//             setSemesters(semestersResponse.data);
//             setSections(sectionsResponse.data);
//             setSchoolYears(schoolYearsResponse.data);

//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     fetchData();
//   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // try {
    //     await axiosInstance.post('/api/students/enroll', formData);
    //     alert('Enrollment completed successfully');
    // } catch (error) {
    //     console.error('Error enrolling student:', error);
    //     alert('Error enrolling student. Please try again.');
    // }
  };

  return (
    <div className='flex'>
      <div className='container mx-auto p-5 m-4'>

        <div className='p-5 flex justify-between'>
          <h1 className='-order-3 text-black'>Enrollment Form</h1>
          <div className="flex items-center -order-2">
            <button type="button" onClick={handlePrint} className="border-gray-900 bg-white text-gray-900 hover:text-gray-700 py-1 px-2 mr-2">
              <FontAwesomeIcon icon={faPrint} className="mr-1" />
              Print Form
            </button>
            <button type="button" className="border-gray-900 bg-white text-gray-900 hover:text-gray-700 py-1 px-2">
              <FontAwesomeIcon icon={faBell} className="mr-1" />
              Notifications
            </button>
          </div>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 m-2 rounded-lg shadow-md flex items-center p-1 ml-2" role="alert" style={{ maxWidth: '100rem' }}>
          <div className="flex-shrink-0">
            <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4 p-1 text-yellow-500" />
          </div>
          <div className="ml-3 text-xs font-small">
            Please fill out the form carefully and double-check your information before submitting.
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 p-5'>
          <div className="lg:col-span-2 p-5">
            <div className="bg-white rounded-lg shadow-md p-3">
              <div className='p-5 flex justify-between'>
                <h3 className='-order-3 text-black'>Hi "Student Name!!"</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-5">
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="program_id">Program</label>
                  <select
                    id="program_id"
                    name="program_id"
                    value={formData.program_id}
                    onChange={handleChange}
                    className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Program</option>
                    {programs.map(program => (
                        <option key={program.id} value={program.id}>{program.program_name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year_level_id">Year level</label>
                  <select
                    id="year_level_id"
                    name="year_level_id"
                    value={formData.year_level_id}
                    onChange={handleChange}
                    className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {yearLevels.map(yearLevel => (
                        <option key={yearLevel.id} value={yearLevel.id}>{yearLevel.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester_id">Semester</label>
                  <select
                    id="semester_id"
                    name="semester_id"
                    value={formData.semester_id}
                    onChange={handleChange}
                    className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {semesters.map(semester => (
                        <option key={semester.id} value={semester.id}>{semester.name}</option>
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
                    className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
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
                    className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
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

export default EnrollmentForm;