import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faExclamationCircle, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axios';

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newSchedule, setNewSchedule] = useState({
    section_name: "",
    subject_name: "",
    day: "",
    start_time: "",
    end_time: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/section-schedules');
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handlePrint = () => window.print();

  const handleEdit = (event) => {
    setEditEventId(event.subjects_enrolled_id);
    setNewSchedule({
      section_name: event.section_name,
      subject_name: event.title,
      day: "",
      start_time: "",
      end_time: ""
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const class_schedule = `${newSchedule.day} ${newSchedule.start_time}-${newSchedule.end_time}`;
      await axiosInstance.put(`/api/admin/${editEventId}/schedule`, { class_schedule });
      fetchEvents(); // Refresh the events
      setShowModal(false);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-grow container mx-auto p-5 m-4 bg-slate-100">
        <div className='p-5 flex justify-between'>
          <h1 className='text-black'>Schedule</h1>
          <button
            type="button"
            onClick={handlePrint}
            className="border-gray-900 bg-white text-gray-900 hover:text-gray-700 py-1 px-2"
          >
            <FontAwesomeIcon icon={faPrint} className="mr-1" />
            Print Schedule
          </button>
        </div>

        {events.length === 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 m-2 rounded-lg shadow-md flex items-center p-1 ml-2" role="alert">
            <div className="flex-shrink-0">
              <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4 p-1 text-yellow-500" />
            </div>
            <div className="ml-3 text-xs font-small">
              Hey there! Just a friendly reminder to keep track of your weekly schedule and upcoming classes. Stay organized and make the most out of your study time!
            </div>
          </div>
        )}

        <div className='p-5 gap-4'>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-3 relative">
              <div className='p-5'></div>
              <div className="overflow-x-auto">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
                  <div>
                    <select
                      id="section"
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="border border-slate-500 bg-white text-black p-2"
                    >
                      <option value="">All Sections</option>
                      {sections.map(section => (
                        <option key={section} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>
                  <div className='border'>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white border-black text-black p-2"
                    />
                  </div>
                </div>
                <table className="w-full text-sm text-left text-black bg-black">
                  <thead className="text-xs uppercase bg-gray-700 text-black">
                    <tr>
                      <th scope="col" className="px-6 py-3">Section</th>
                      <th scope="col" className="px-6 py-3">Course</th>
                      <th scope="col" className="px-6 py-3">Subject</th>
                      <th scope="col" className="px-6 py-3">Class Schedule</th>
                      <th scope="col" className="px-6 py-3">Instructor</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.filter(event =>
                      (selectedSection === "" || event.section_name === selectedSection) &&
                      (searchTerm === "" || event.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map(event => (
                      <tr key={event.id} className="bg-white border-b text-black">
                        <td className="px-6 py-4">{event.section_name}</td>
                        <td className="px-6 py-4">{event.subject_code}</td>
                        <td className="px-6 py-4">{event.title}</td>
                        <td className="px-6 py-4">{event.class_schedule}</td>
                        <td className="px-6 py-4">{event.instructor_name}</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <button onClick={() => handleEdit(event)} className="text-blue-500">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Edit Event */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
              <h2 className="text-lg font-semibold mb-4">Edit Schedule</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-700">Section</label>
                  <input
                    type="text"
                    value={newSchedule.section_name}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={newSchedule.subject_name}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Day</label>
                  <select
                    value={newSchedule.day}
                    onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select Day</option>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={newSchedule.start_time}
                    onChange={(e) => setNewSchedule({ ...newSchedule, start_time: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={newSchedule.end_time}
                    onChange={(e) => setNewSchedule({ ...newSchedule, end_time: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
