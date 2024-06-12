import React, { useState } from 'react';
//import Calendar from 'react-calendar';
//import Sidebar from './Sidebar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPrint, faExclamationCircle, faTrash, faEdit, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      section: "A",
      course: "BSIT",
      monday: { time: "8:00 - 9:00", subject: "Subject 1" },
      tuesday: { time: "9:00 - 10:00", subject: "Physics 1" },
      wednesday: { time: "", subject: "" },
      thursday: { time: "10:00 - 11:00", subject: "English 1" },
      friday: { time: "11:00 - 12:00", subject: "Rizal 1" },
      saturday: { time: "", subject: "" },
      sunday: { time: "", subject: "" }
    }
  ]);
  const [newEvent, setNewEvent] = useState({
    section: "",
    course: "",
    monday: { time: "", subject: "" },
    tuesday: { time: "", subject: "" },
    wednesday: { time: "", subject: "" },
    thursday: { time: "", subject: "" },
    friday: { time: "", subject: "" },
    saturday: { time: "", subject: "" },
    sunday: { time: "", subject: "" }
  });
  const [editEventId, setEditEventId] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sections] = useState(["A", "B", "C", "D"]); // Define your sections here
  const [showModal, setShowModal] = useState(false); // State to toggle the modal visibility

  const predefinedCourses = [
    "BSIT", "BSCE", "ARCH", "BSCM", "BSBS", "BSBS"
  ];

  const predefinedSubjects = {
    "BSIT": ["Subject 1", "Subject 2", "Subject 3"],
    "BSCE": ["Physics 1", "Physics 2", "Physics 3"],
    "ARCH": ["English 1", "English 2", "English 3"],
    "BSCM": ["Chemistry 1", "Chemistry 2", "Chemistry 3"],
    "BSBS": ["Rizal 1", "Rizal 2", "Rizal 3"],
    "": []
  };

  const onChange = (newDate) => setDate(newDate);

  const handlePrint = () => window.print();

  const handleDelete = (id) => setEvents(events.filter(event => event.id !== id));

  const handleEdit = (id) => {
    setEditEventId(id);
    const eventToEdit = events.find(event => event.id === id);
    setNewEvent({ ...eventToEdit });
  };

  const resetNewEventState = () => {
    setNewEvent({
      section: "",
      course: "",
      monday: { time: "", subject: "" },
      tuesday: { time: "", subject: "" },
      wednesday: { time: "", subject: "" },
      thursday: { time: "", subject: "" },
      friday: { time: "", subject: "" },
      saturday: { time: "", subject: "" },
      sunday: { time: "", subject: "" }
    });
  };

  const handleAdd = () => {
    setEvents([
      ...events,
      {
        id: Date.now(),
        section: newEvent.section,
        course: newEvent.course,
        monday: newEvent.monday,
        tuesday: newEvent.tuesday,
        wednesday: newEvent.wednesday,
        thursday: newEvent.thursday,
        friday: newEvent.friday,
        saturday: newEvent.saturday,
        sunday: newEvent.sunday
      }
    ]);
    resetNewEventState();
    setShowModal(false);
  };

  const handleSectionChange = (value) => setSelectedSection(value);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleDayChange = (day, field, value) => {
    setNewEvent(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [field]: value
      }
    }));
  };

  const handleCourseChange = (course) => {
    setNewEvent(prevState => ({
      ...prevState,
      course,
      monday: { time: "", subject: "" },
      tuesday: { time: "", subject: "" },
      wednesday: { time: "", subject: "" },
      thursday: { time: "", subject: "" },
      friday: { time: "", subject: "" },
      saturday: { time: "", subject: "" },
      sunday: { time: "", subject: "" }
    }));
  };

  const handleSave = () => {
    const updatedEvents = events.map(event => {
      if (event.id === editEventId) {
        return {
          ...event,
          section: newEvent.section,
          course: newEvent.course,
          monday: newEvent.monday,
          tuesday: newEvent.tuesday,
          wednesday: newEvent.wednesday,
          thursday: newEvent.thursday,
          friday: newEvent.friday,
          saturday: newEvent.saturday,
          sunday: newEvent.sunday
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    setEditEventId(null);
    resetNewEventState();
  };

  return (
    <div className="flex">
      <div className="flex-grow container mx-auto p-5 m-4 bg-slate-100">
        <div className='p-5 flex justify-between'>
          <h1 className='text-black'>Schedule</h1>
          <div className="flex items-center">
            <button type="button" className="border-gray-900 bg-white text-gray-900 hover:text-gray-700 py-1 px-2">
              <FontAwesomeIcon icon={faBell} className="mr-1" />
              Notifications
            </button>
            <div className='p-1'></div>
            <button type="button" onClick={handlePrint} className="border-gray-900 bg-white text-gray-900 hover:text-gray-700 py-1 px-2 mr-2">
              <FontAwesomeIcon icon={faPrint} className="mr-1" />
              Print Schedule
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="border-gray-900 bg-white text-gray-900 hover:text-gray-700 py-1 px-2"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add Schedule
            </button>
          </div>
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
                      onChange={(e) => handleSectionChange(e.target.value)}
                      className="border border-slate-500 bg-white text-black  p-2"
                    >
                      <option value="">All Sections</option>
                      {sections.map(section => (
                        <option key={section} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>
                  <div className='border '>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className=" bg-white border-black text-black p-2"
                    /> 
                  </div>
                </div>
                <table className="w-full text-sm text-left text-white bg-black">
                  <thead className="text-xs text-black uppercase bg-white">
                    <tr>
                      <th scope="col" className="px-6 py-3">Section</th>
                      <th scope="col" className="px-6 py-3">Course</th>
                      <th scope="col" className="px-6 py-3">Monday</th>
                      <th scope="col" className="px-6 py-3">Tuesday</th>
                      <th scope="col" className="px-6 py-3">Wednesday</th>
                      <th scope="col" className="px-6 py-3">Thursday</th>
                      <th scope="col" className="px-6 py-3">Friday</th>
                      <th scope="col" className="px-6 py-3">Saturday</th>
                      <th scope="col" className="px-6 py-3">Sunday</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.filter(event =>
                      (!selectedSection || event.section === selectedSection) &&
                      (event.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.monday.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.tuesday.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.wednesday.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.thursday.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.friday.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.saturday.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.sunday.subject.toLowerCase().includes(searchTerm.toLowerCase()))
                    ).map(event => (
                      <tr key={event.id} className="bg-white text-black">
                        <td className="px-6 py-4">{event.section}</td>
                        <td className="px-6 py-4">{event.course}</td>
                        <td className="px-6 py-4">{event.monday.time} - {event.monday.subject}</td>
                        <td className="px-6 py-4">{event.tuesday.time} - {event.tuesday.subject}</td>
                        <td className="px-6 py-4">{event.wednesday.time} - {event.wednesday.subject}</td>
                        <td className="px-6 py-4">{event.thursday.time} - {event.thursday.subject}</td>
                        <td className="px-6 py-4">{event.friday.time} - {event.friday.subject}</td>
                        <td className="px-6 py-4">{event.saturday.time} - {event.saturday.subject}</td>
                        <td className="px-6 py-4">{event.sunday.time} - {event.sunday.subject}</td>
                        <td className="px-6 py-4">
                          <button
                            className="text-black hover:text-red-900 bg-white border-black mr-2"
                            onClick={() => handleEdit(event.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="text-black hover:text-red-900 bg-white border-black"
                            onClick={() => handleDelete(event.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
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

        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h2 className="text-bold text-lg leading-6 font-large text-gray-900">
                        Add New Schedule
                      </h2>
                      <br></br>
                      <div className="mt-2">
                        <div className="mb-4">
                          <h2 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="section">Section</h2>
                          <select
                            id="section"
                            value={newEvent.section}
                            onChange={(e) => setNewEvent({ ...newEvent, section: e.target.value })}
                            className=" border border-b bg-white text-black py-2 px-3 "
                          >
                            <option className="border   border-b bg-white text-black   rounded w-full py-2 px-3 " value="">Select Section</option>
                            {sections.map(section => (
                              <option className='border border-b bg-white text-black rounded w-full py-2 px-3 ' key={section} value={section}>{section}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <h2 className=" block text-black text-sm font-bold mb-2" htmlFor="course">Course</h2>
                          <select
                            id="course"
                            value={newEvent.course}
                            onChange={(e) => handleCourseChange(e.target.value)}
                            className=" border border-black bg-white text-black   w-full py-2 px-3 "
                          >
                            <option className="border border-slate-500 bg-white text-black  rounded w-full py-2 px-3" value="">Select Course  ↓</option>
                            {predefinedCourses.map(course => (
                              <option key={course} value={course}>{course}</option>
                            ))}
                          </select>
                        </div>
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => (
                          <div key={day} className="mb-4">
                            <h2 className="block text-gray-700 bg-whitetext-sm font-bold mb-2 capitalize" htmlFor={day}>{day}</h2>
                            <div className="flex items-center">
                              <input
                                type="text"
                                placeholder="Time"
                                value={newEvent[day].time}
                                onChange={(e) => handleDayChange(day, "time", e.target.value)}
                                className=" border-b border-black bg-white text-black  py-2 px-3  mr-2"
                              />
                              <select
                                id={`${day}-subject`}
                                value={newEvent[day].subject}
                                onChange={(e) => handleDayChange(day, "subject", e.target.value)}
                                className=" border-b border-black bg-white text-black  py-2 px-3  mr-2"
                              >
                                <option value="">Select Subject</option>
                                {predefinedSubjects[newEvent.course]?.map(subject => (
                                  <option key={subject} value={subject}>{subject}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-grayfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editEventId && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class
Name="absolute inset-0 bg-gray-500 opacity-75"></div>
</div>
<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div className="sm:flex sm:items-start">
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg bg-white leading-6 font-medium text-gray-900">
          Edit Schedule
        </h3>
        <div className="mt-2">
          <div className="mb-4">
            <h2 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="section">Section</h2>
            <select
              id="section"
              value={newEvent.section}
              onChange={(e) => setNewEvent({ ...newEvent, section: e.target.value })}
              className=" bg-white w-full py-2 px-3 text-black "
            >
              <option value="">Select Section</option>
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h2 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">Course</h2>
            <select
              id="course"
              value={newEvent.course}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="w-full bg-white py-2 px-3 text-black "
            >
              <option value="">Select Course</option>
              {predefinedCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => (
            <div key={day} className="mb-4 ">
              <h2 className="block text-gray-700 text-sm font-bold mb-2 capitalize" htmlFor={day}>{day}</h2>
              <div className="flex items-center ">
                <input
                  type="text"
                  placeholder="Time"
                  value={newEvent[day].time}
                  onChange={(e) => handleDayChange(day, "time", e.target.value)}
                  className="border-b border-black bg-white text-black   py-2 px-3  mr-2"
                />
                <select
                  id={`${day}-subject`}
                  value={newEvent[day].subject}
                  onChange={(e) => handleDayChange(day, "subject", e.target.value)}
                  className=" border-b border-black bg-white text-black  py-2 px-3  mr-2"
                >
                  <option className=" border-b border-black bg-white text-black " value="">Select Subject</option>
                  {predefinedSubjects[newEvent.course]?.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    <button
      type="button"
      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={handleSave}
    >
      Save
    </button>
    <button
      type="button"
      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
      onClick={() => setEditEventId(null)}
    >
      Cancel
    </button>
  </div>
</div>
</div>
</div>
)}
</div>
</div>
);
};

export default Schedule;
