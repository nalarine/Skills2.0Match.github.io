import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CompanySidebar from "./CompanySidebar";
import CompanyHeader from "./CompanyHeader";
import { toast, ToastContainer } from 'react-toastify';
import { apiRequest } from "../../utils";
import { useSelector } from "react-redux";

export default function CompanyLayout() {
  const { user } = useSelector((state) => state.user);
  const [fetching, setFetching] = useState(false);
  const [oldJobDetails, setOldJobDetails] = useState([]);
  const [newJobDetails, setNewJobDetails] = useState([]);

  const getJobDetails = async () => {
    try {
      const res = await apiRequest({
        url: "/companies/get-company/" + user._id,
        method: "GET",
      });
      setNewJobDetails(res.data.jobPosts);
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
    }, 10000)
  }, [])

  useEffect(() => {
    for (let newJobPost of newJobDetails) {
      let oldJobPost = oldJobDetails.filter(oldJobPost => oldJobPost._id == newJobPost._id);
      if (oldJobPost && oldJobPost.length > 0) {
        oldJobPost = oldJobPost[0];
        if (oldJobPost.vacancies > newJobPost.vacancies) {
          // Someone applied
          toast.success('Someone applied on your job post: ' + newJobPost.jobTitle);
        }
      }
      setOldJobDetails(newJobDetails);
    }
  }, [newJobDetails])

  return (
    <div className="fixed inset-0 flex flex-row h-screen w-screen bg-[#e7e8ea]">
      <div className="fixed inset-0 flex flex-row w-screen h-screen">
        <CompanySidebar />
        <div className="flex flex-col flex-1">
          <CompanyHeader />
          <div className="flex-1 min-h-0 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
