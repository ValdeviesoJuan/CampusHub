import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import BlackLoadingSpinner from './BlackLoadingSpinner';
import axiosInstance from '../axios';

const EnrollmentInstructor = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    contact_number: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const enrolledResponse = await axiosInstance.get('/api/instructors/enrolled');
            setIsEnrolled(enrolledResponse.data.isEnrolled); 
            setLoading(false);

        } catch (error) {
            console.error('Error fetching instructor registration status:', error);
            alert('Error instructor registration status. Please check console for details.');

        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  console.log(isEnrolled);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    console.log('Form submitted:', formData);

    if (formData.email !== formData.email.toLowerCase()) {
        setErrorMessage('Email must be in lowercase.');
        return;
    }

    if (formData.name.length === 0) {
        setErrorMessage('Name is required.');
        return;
    }
    
    try {
      await axiosInstance.post('/api/instructors/enroll', formData);
      alert('Instructor registration completed successfully');
      setEnrollmentSuccess(true);
    } catch (error) {
      console.error('Error enrolling instructor:', error);
      alert('Error enrolling instructor. Please try again.');
    }
  };

  if (loading) {
    return  <div className='relative flex align-middle justify-center text-center mx-auto my-auto'> <BlackLoadingSpinner /> </div>
  }

  if (isEnrolled) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md flex items-center" role="alert" style={{ maxWidth: '30rem' }}>
                <FontAwesomeIcon icon={faExclamationCircle} className="h-6 w-6 text-yellow-500 mr-3" />
                <div>
                    <p className="font-bold">Instructor Registration Status</p>
                    <p>You are already registered and cannot register again.</p>
                </div>
            </div>
        </div>
    );
  }

  if (enrollmentSuccess) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md" role="alert">
          <p>You've successfully registered, you can proceed to assign student grades and see your schedules.</p>
        </div>
      </div>
    );
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
                <h3 className='-order-3 text-black'> Instructor Enrollment Form</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-5">
                {errorMessage && <p className="relative text-red-500 text-center text-[14px]">{errorMessage}</p>}

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthdate">Birthdate</label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number">Contact Number</label>
                  <input
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
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

export default EnrollmentInstructor;