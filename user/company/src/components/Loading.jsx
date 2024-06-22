import React from 'react';
import loadingGif from '../assets/loading.gif'; // Adjust path based on your project structure

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="py-2 px-5 rounded-lg flex items-center flex-col">
        <img src={loadingGif} alt="Loading..." className="h-20 w-20 mb-4" />
        <div className="loader-dots">
          <div className="loader-dot bg-gray-600"></div>
          <div className="loader-dot bg-gray-600"></div>
          <div className="loader-dot bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
