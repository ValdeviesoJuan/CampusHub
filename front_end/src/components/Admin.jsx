import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Creator Section</h2>
          <p className="text-gray-700 mb-4">
            Feel free to make changes, Have Fun!
          </p>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              ADD
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              EDIT
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              DELETE
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Content;
