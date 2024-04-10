import React from 'react';
import job from '../../../company/src/assets/job.png';
import interview from '../../../company/src/assets/interview.png'
import messages from '../../../company/src/assets/messages.png'

export default function DashboardStatsGrid({ jobMatches }) {
  return (
    <div className="flex gap-2 py-3">
      <BoxWrapper>
        <div className="rounded-full h-8 w-16 bg-blue flex items-center justify-center">
          <img src={job} alt="Job Matches" className="w-24 h-18 mr-2" />
        </div>
        <div className="pl-8">
          <span className="text-sm font-semibold">Job Matches</span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">{jobMatches} New Job Suited</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-16 bg-dark-yellow flex items-center justify-center">
          <img src={interview} alt="image" className="w-24 h-18 mr-2" /> {/* Added image tag */}
        </div>
        <div >
          <span className="text-sm font-semibold">
            Schedule for Interview
          </span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">
              {/* {item.toInterview} Candidates for Interview */}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-16 bg-green flex items-center justify-center">
          <img src={messages} alt="image" className="w-24 h-18 mr-2" /> {/* Added image tag */}
        </div>
        <div className="pl-4">
          <span className="text-sm font-semibold">Messages Received</span>
          <div className="flex items-center">
            <strong className="text-xl font-bold">
              {/* {item.receivedMessages} messages */}
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
