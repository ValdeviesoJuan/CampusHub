import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Sidebar from './Sidebar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPrint, faExclamationCircle, faTrash, faEdit, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState("event1");
  const [events, setEvents] = useState([
    { id: 1, time: "8:00 - 9:00", monday: "Information Management (Lab)", tuesday: "Physics", wednesday: "English", thursday: "Chemistry Lab", friday: "Life and works of Rizal", saturday: "-", sunday: "-" }
  ]);
  const [newEvent, setNewEvent] = useState({
    time: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleAdd = () => {
    if (editMode) {
      const updatedEvents = events.map(event => {
        if (event.id === editEventId) {
          return { ...event, ...newEvent };
        }
        return event;
      });
      setEvents(updatedEvents);
      setEditMode(false);
      setEditEventId(null);
    } else {
      setEvents([...events, { id: Date.now(), ...newEvent }]);
    }
    setNewEvent({
      time: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: ""
    });
  };

  const handleEdit = (id) => {
    const eventToEdit = events.find(event => event.id === id);
    setNewEvent(eventToEdit);
    setEditMode(true);
    setEditEventId(id);
  };

  return (
    <div className="flex">
      <Sidebar />
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
          </div>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 m-2 rounded-lg shadow-md flex items-center p-1 ml-2" role="alert">
          <div className="flex-shrink-0">
            <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4 p-1 text-yellow-500" />
          </div>
          <div className="ml-3 text-xs font-small">
            Hey there! Just a friendly reminder to keep track of your weekly schedule and upcoming classes. Stay organized and make the most out of your study time!
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 p-5 gap-4'>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-3">
              <div className='p-5'>
                <h3 className='text-black'>Hi "Admin/Teacher!!"</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="border-collapse border  border-slate-900">
                  <thead>
                    <tr className="bg-slate-900 text-black">
                      <th className="border px-2 py-1" width="20%">Time</th>
                      <th className="border px-2 py-1" colSpan="2">Monday</th>
                      <th className="border px-2 py-1" colSpan="2">Tuesday</th>
                      <th className="border px-2 py-1" colSpan="2">Wednesday</th>
                      <th className="border px-2 py-1" colSpan="2">Thursday</th>
                      <th className="border px-2 py-1" colSpan="2">Friday</th>
                      <th className="border px-2 py-1" colSpan="2">Saturday</th>
                      <th className="border px-2 py-1" colSpan="2">Sunday</th>
                      <th className="border px-2 py-1"></th>
                    </tr>
                  </thead>
                  <tbody className="text-black text-center">
                    {events.map(event => (
                      <tr key={event.id} className="bg-white">
                        <td className="border px-2 py-1">{event.time}</td>
                        <td className="border px-2 py-1" colSpan="2">{event.monday}</td>
                        <td className="border px-2 py-1" colSpan="2">{event.tuesday}</td>
                        <td className="border px-2 py-1" colSpan="2">{event.wednesday}</td>
                        <td className="border px-2 py-1" colSpan="2">{event.thursday}</td>
                        <td className="border px-2 py-1" colSpan="2">{event.friday}</td>
                        <td className="border px-2 py-1" colSpan="2">{event.saturday}</td>
                        <td className="border px-2 py-1" colSpan="2">{event.sunday}</td>
                        <td className="border px-2 py-1">
                          <button className='bg-white border-black' onClick={() => handleEdit(event.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className='bg-white border-black' onClick={() => handleDelete(event.id)}>
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

          <div className="lg:col-span-1 bg-white">
            <div className="bg-white text-gray-800 shadow-lg rounded-lg p-4 mb-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-slate-500 bg-white">{editMode ? "Edit Event" : "Add Event"}</h2>
              <div className="divide-y divide-white">
                <div className="py-2 border-slate-500 bg-white">
                  <input type="text" placeholder="Time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <input type="text" placeholder="Monday" value={newEvent.monday} onChange={(e) => setNewEvent({ ...newEvent, monday: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <input type="text" placeholder="Tuesday" value={newEvent.tuesday} onChange={(e) => setNewEvent({ ...newEvent, tuesday: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <input type="text" placeholder="Wednesday" value={newEvent.wednesday} onChange={(e) => setNewEvent({ ...newEvent, wednesday: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <input type="text" placeholder="Thursday" value={newEvent.thursday} onChange={(e) => setNewEvent({ ...newEvent, thursday: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <input type="text" placeholder="Friday" value={newEvent.friday} onChange={(e) => setNewEvent({ ...newEvent, friday: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <input type="text" placeholder="Saturday" value={newEvent.saturday} onChange={(e) => setNewEvent({ ...newEvent, saturday: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <input type="text" placeholder="Sunday" value={newEvent.sunday} onChange={(e) => setNewEvent({ ...newEvent, sunday: e.target.value })} className="border border-slate-500 bg-white rounded-md p-2 mb-2" />
                  <button onClick={handleAdd} className=" border-slate-500 bg-white text-black px-3 py-1 rounded-md hover:bg-gray-800">
                    <FontAwesomeIcon icon={editMode ? faSave : faPlus}  />
                    {editMode ? "Save" : "Add"}
                  </button>
                </div>
              </div>
            </div>
            <div className='p-5'></div>
            <div className="bg-white relative rounded-lg shadow-lg p-5 text-gray-800 ">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Calendar</h2>
              <div className="flex justify-center">
                <Calendar
                  onChange={onChange}
                  value={date}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
