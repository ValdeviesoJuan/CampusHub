import React, { Component } from 'react';
import Sidebar from './Sidebar'; // Make sure the path is correct

class Grades extends Component {
  handlePrint = () => {
    window.print();
  }

  render() {
    return (
      <div className="flex">
        <Sidebar />
        <main className="relative flex flex-col items-center p-8 w-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-left text-black">Grades</h1>
            <select className="form-control input-sm menu-select bg-white text-black border-2 border-gray-900">
              <option value="Year1">2023-2024 2nd Semester</option>
              <option value="Year2">2023-2024 1st Semester</option>
              <option value="Year3">2022-2023 2nd Semester</option>
              <option value="Year4">2022-2023 1st Semester</option>
            </select>
          </div>
          <div className="w-full flex justify-between items-center mb-6">
            <button onClick={this.handlePrint} className="p-2 bg-blue-500 text-white rounded-lg">Print Grades</button>
            <div className="p-4 bg-gray-200 border-2 border-gray-900 rounded-lg">
              <h2 className="text-lg font-bold text-black">Average Grade</h2>
              <p className="text-xl text-black">B+</p>
            </div>
          </div>
          <div className="shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left text-black border-4 border-gray-900">
              <thead className="text-xs uppercase dark:text-black">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Subject Code</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Units</th>
                  <th scope="col" className="px-6 py-3">Section</th>
                  <th scope="col" className="px-6 py-3">Midterm</th>
                  <th scope="col" className="px-6 py-3">Final</th>
                  <th scope="col" className="px-6 py-3">Re-exam</th>
                  <th scope="col" className="px-6 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white border-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">1</th>
                  <td className="px-6 py-4">IT221</td>
                  <td className="px-6 py-4">Information Management</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">IT2R2</td>
                  <td className="px-6 py-4">1.00</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet Posted</td>
                </tr>
                <tr className="border-b bg-white border-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">2</th>
                  <td className="px-6 py-4">IT222</td>
                  <td className="px-6 py-4">Networking 1</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">IT2R2</td>
                  <td className="px-6 py-4">1.00</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet Posted</td>
                </tr>
                <tr className="border-b bg-white border-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">3</th>
                  <td className="px-6 py-4">IT223</td>
                  <td className="px-6 py-4">Web Systems and Technologies</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">IT2R2</td>
                  <td className="px-6 py-4">1.00</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet Posted</td>
                </tr>
                <tr className="border-b bg-white border-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">4</th>
                  <td className="px-6 py-4">IT224</td>
                  <td className="px-6 py-4">Systems Integration and Architecture</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">IT2R2</td>
                  <td className="px-6 py-4">1.00</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet Posted</td>
                </tr>
                <tr className="border-b bg-white border-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">5</th>
                  <td className="px-6 py-4">Ethc</td>
                  <td className="px-6 py-4">Ethics</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">IT2R2</td>
                  <td className="px-6 py-4">1.00</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet Posted</td>
                </tr>
                <tr className="border-b bg-white border-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">6</th>
                  <td className="px-6 py-4">Rizal</td>
                  <td className="px-6 py-4">Life and Works of Rizal</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">IT2R2</td>
                  <td className="px-6 py-4">1.00</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet Posted</td>
                </tr>
                <tr className="border-b bg-white border-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">7</th>
                  <td className="px-6 py-4">PATH FIT 4</td>
                  <td className="px-6 py-4">Physical Activity Towards Health and Fitness 2</td>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">IT2R2</td>
                  <td className="px-6 py-4">1.00</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet</td>
                  <td className="px-6 py-4">Not Yet Posted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }
}

export default Grades;
