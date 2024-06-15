import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPrint, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axios';


const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState("event1");
  const [studentName, setStudentName] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await axiosInstance.get('/api/students/enrolled');
        const { isEnrolled, studentId } = response.data;
        if (isEnrolled) {
          setIsEnrolled(isEnrolled);
          setStudentId(studentId);
          fetchEnrolledSubjects(studentId);
        } else {
          alert('You are not enrolled as a student.');
          // Handle redirect or display message for non-enrolled user
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
        alert('Error checking enrollment. Please check console for details.');
      }
    };

    const fetchEnrolledSubjects = async (studentId) => {
      try {
        const response = await axiosInstance.get(`/api/students/${studentId}/subjects_enrolled`);
        setEnrolledSubjects(response.data.enrolledSubjects);
        setStudentName(response.data.studentName);
      } catch (error) {
        console.error('Error fetching enrolled subjects:', error);
        alert('Error fetching enrolled subjects. Please check console for details.');
      }
    };

    checkEnrollment();
  }, []);

    
  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='flex'>
     
      <div className='container mx-auto p-5 m-4'>
        <div className='p-5 flex justify-between'>
          <h1 className='-order-3 text-black'>Schedule</h1>
          <div className="flex items-center -order-2">
            <button type="button" onClick={handlePrint} className="border-gray-900 bg-white text-gray-900 hover:text-gray-700 py-1 px-2 mr-2">
              <FontAwesomeIcon icon={faPrint} className="mr-1" />
              Print Schedule
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
            Hey there! Just a friendly reminder to keep track of your weekly schedule and upcoming classes. Stay organized and make the most out of your study time!
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 p-5'>
          <div className="lg:col-span-2 p-5 ">
            <div className="bg-white rounded-lg shadow-md p-3">
              <div className='p-5 flex justify-between'>
                <h3 className='-order-3 text-black'>Hi {studentName}!!</h3>
              </div>
              <br />
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#9e9b9b]">
                      <th className="border bg-gray-900 text-white px-2 py-1" width="20%">ID</th>
                      <th className="border bg-gray-900 text-white px-2 py-1" colSpan="2">Subject Code</th>
                      <th className="border bg-gray-900 text-white px-2 py-1" colSpan="2">Description</th>
                      <th className="border bg-gray-900 text-white px-2 py-1" colSpan="2">Credit Unit</th>
                      <th className="border bg-gray-900 text-white px-2 py-1" colSpan="2">Section</th>
                      <th className="border bg-gray-900 text-white px-2 py-1" colSpan="2">Schedule</th>
                      <th className="border bg-gray-900 text-white px-2 py-1" colSpan="2">Teacher</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {enrolledSubjects.map((subject, index) => (
                      <tr className="bg-white text-center">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                          {index + 1}
                        </th>
                        <td className="border border-gray px-2 py-1" colSpan="2">{subject.subject.subject_code}</td>
                        <td className="border border-gray px-2 py-1" colSpan="2">{subject.subject.title}</td>
                        <td className="border border-gray px-2 py-1" colSpan="2">{subject.subject.credit_unit}</td>
                        <td className="border border-gray px-2 py-1" colSpan="2">{subject.student.section.name}</td>
                        <td className="border border-gray px-2 py-1" colSpan="2">{subject.class_schedule}</td>
                        <td className="border border-gray px-2 py-1" colSpan="2">{subject.instructor_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 p-5">
            <div className="bg-white text-gray-800 shadow-lg rounded-lg p-4 mb-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Calendar</h2>
              <div className="flex justify-center">
                <Calendar
                  onChange={onChange}
                  value={date}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className='bg-slate-gray-100'>
              <div className="bg-white relative rounded-lg shadow-lg p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                <div className="divide-y divide-gray-200">
                  <select className="mb-4" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
                    <option value="event1">Event 1</option>
                    <option value="event2">Event 2</option>
                    <option value="event3">Event 3</option>
                  </select>
                  <div className="py-2">
                    {selectedEvent === "event1" && (
                      <div className="text-black" id="event1">
                        <h6>June 25, 2024</h6>
                        <h6>Happy Birthday To You</h6>
                      </div>
                    )}
                    {/* Additional event details go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
