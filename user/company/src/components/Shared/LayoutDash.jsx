import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSelector } from 'react-redux';
import { apiRequest } from '../../utils';

export default function Layout() {
  const { user } = useSelector((state) => state.user);
  const [fetching, setFetching] = useState(false);
  const [oldJobDetails, setOldJobDetails] = useState([]);
  const [newJobDetails, setNewJobDetails] = useState([]);

  const getJobDetails = async () => {
    try {
      const res = await apiRequest({
        url: '/jobs/job-applications/' + user._id,
        method: 'GET',
        token: user?.token
      });
      let tableData = [];
      for (let data of res.data) {
        for (let applicant of data.applicants) {
          tableData.push({
            companyName: data.companyName,
            ...applicant
          });
        }
      }
      setNewJobDetails(tableData);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (!fetching) {
        setFetching(true);
        getJobDetails();
      }
    }, 10000);
  }, []);

  useEffect(() => {
    for (let newJobPost of newJobDetails) {
      let oldJobPost = oldJobDetails.filter(
        (oldJobPost) => oldJobPost.id == newJobPost.id
      );
      if (oldJobPost && oldJobPost.length > 0) {
        oldJobPost = oldJobPost[0];
        if (oldJobPost.hiringStage != newJobPost.hiringStage) {
          console.log(newJobPost);
          // No need to use toastify here, handle notifications in Header component
        }
      }
    }
    setOldJobDetails(newJobDetails);
  }, [newJobDetails]);

  return (
    <div className="fixed inset-0 flex flex-row h-screen w-screen bg-[#e7e8ea]">
      <div className="fixed inset-0 flex flex-row w-screen h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header newJobDetails={newJobDetails} />
          <div className="flex-1 min-h-0 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}