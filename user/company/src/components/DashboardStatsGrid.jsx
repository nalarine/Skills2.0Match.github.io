import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import job from '../../../company/src/assets/job.png';
import interview from '../../../company/src/assets/interview.png';
import messages from '../../../company/src/assets/messages.png';

export default function DashboardStatsGrid({ jobMatches }) {
  const [applicants, setApplicants] = useState([]);
  const [totalJobPosts, setTotalJobPosts] = useState(0);
  const [archivedJobs, setArchivedJobs] = useState(0); // Assuming you'll get this data similarly
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
<<<<<<< Updated upstream
    if (user && user._id && user.accountType === 'seeker') {
      const fetchData = async () => {
=======
    if (user && user._id && user.accountType === 'company') {
      const fetchCompanyData = async () => {
>>>>>>> Stashed changes
        try {
          const res = await apiRequest({
            url: `/companies/get-company/${user._id}`,
            method: 'GET',
          });
          setApplicants(res.data.applicants);
          setTotalJobPosts(res?.data?.jobPosts?.length || 0);
          setArchivedJobs(res?.data?.archivedJobs?.length || 0); // Adjust according to your data structure
        } catch (error) {
          console.error('Error loading company data:', error);
        }
      };

      fetchCompanyData();
    }
  }, [user]);

<<<<<<< Updated upstream
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

    if (user && user._id && user.accountType === 'seeker') {
      fetchCompany();
    }
  }, [user]);

  return (
    <div className="flex gap-2 py-3">
      {user?.accountType === 'seeker' ? (
        <BoxWrapper>
          <div className="rounded-full h-8 w-16 bg-blue flex items-center justify-center">
            <img src={job} alt="Job Matches" className="w-24 h-18 mr-2" />
          </div>
          <div className="pl-8">
            <span className="text-sm font-semibold">Total Job Posted</span>
            <div className="flex items-center">
              <strong className="text-xl font-bold">
                {totalJobPosts} Job Posted
              </strong>
=======
  const isCompanyDash = location.pathname === '/CompanyDash';

  return (
    <div className="flex gap-2 py-3">
      {isCompanyDash ? (
        <>
          <BoxWrapper>
            <div className="rounded-full h-8 w-16 bg-blue flex items-center justify-center">
              <img src={job} alt="Job Matches" className="w-24 h-18 mr-2" />
>>>>>>> Stashed changes
            </div>
            <div className="pl-8">
              <span className="text-sm font-semibold">Total Job Posted</span>
              <div className="flex items-center">
                <strong className="text-xl font-bold">
                  {totalJobPosts} Job Posted
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
                  {archivedJobs} Archived Jobs
                </strong>
              </div>
            </div>
          </BoxWrapper>
        </>
      ) : (
        <BoxWrapper>
          <Link
            to={user?.accountType === 'seeker' ? '/Dashboard' : '/CompanyDash'}
            className="flex items-center"
          >
            <div className="rounded-full h-8 w-16 bg-blue flex items-center justify-center">
              <img src={job} alt="Job Matches" className="w-24 h-18 mr-2" />
            </div>
            <div className="pl-8">
              <span className="text-sm font-semibold">Total Job Matches</span>
              <div className="flex items-center">
                <strong className="text-xl font-bold">
                  {jobMatches} New Job Suited
                </strong>
              </div>
            </div>
          </Link>
        </BoxWrapper>
      )}
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
