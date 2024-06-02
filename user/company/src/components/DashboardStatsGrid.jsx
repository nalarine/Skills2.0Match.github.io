import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils';
import { useSelector } from 'react-redux';
import job from '../../../company/src/assets/job.png';
import interview from '../../../company/src/assets/interview.png';
import messages from '../../../company/src/assets/messages.png';

export default function DashboardStatsGrid({ jobMatches }) {
  const [applicants, setApplicants] = useState([]);
  const [totalJobPosts, setTotalJobPosts] = useState(0);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id) {
      const fetchData = async () => {
        try {
          const res = await apiRequest({
            url: `/companies/get-company/${user._id}`,
            method: 'GET',
          });
          setApplicants(res.data.applicants);
        } catch (error) {
          console.error('Error loading company data:', error);
        }
      };

      fetchData();
    }
  }, [user]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const id = user?._id;
        const res = await apiRequest({
          url: '/companies/get-company/' + id,
          method: 'GET',
        });

        setTotalJobPosts(res?.data?.jobPosts?.length || 0); // Set total job posts
      } catch (error) {
        console.error('Error loading company data:', error);
      }
    };

    if (user && user._id) {
      fetchCompany();
    }
  }, [user]);

  return (
    <div className="flex gap-2 py-3">
      <BoxWrapper>
        <div className="rounded-full h-8 w-16 bg-blue flex items-center justify-center">
          <img src={job} alt="Job Matches" className="w-24 h-18 mr-2" />
        </div>
        <div className="pl-8">
          <span className="text-sm font-semibold">Total Job Posted</span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">
              {totalJobPosts} Job Posted {/* Use totalJobPosts here */}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-16 bg-dark-yellow flex items-center justify-center">
          <img src={interview} alt="image" className="w-24 h-18 mr-2" />
        </div>
        <div>
          <span className="text-sm font-semibold">Total Applicants</span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">
              {applicants.length} Applicants
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-16 bg-green flex items-center justify-center">
          <img src={messages} alt="image" className="w-24 h-18 mr-2" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-semibold">Archived Jobs</span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">
              {/* {applicants.reduce((acc, curr) => acc + curr.receivedMessages, 0)} messages */}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-md border border-gray rounded p-4 flex-1 flex items-center h-24">
      {children}
    </div>
  );
}
