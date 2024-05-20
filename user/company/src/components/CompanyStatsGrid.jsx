import React from 'react'
import { IoPeopleSharp, IoPersonAdd } from 'react-icons/io5'
import { DUMMY_DATA_INFO } from './lib/consts/dummy/dummy'
import { BiSolidMessageDetail } from 'react-icons/bi'

import job from '../../../company/src/assets/job.png'
import interview from '../../../company/src/assets/interview.png'
import messages from '../../../company/src/assets/messages.png'

export default function DashboardStatsGrid() {
  return (
    <>
      {DUMMY_DATA_INFO.map(
        (
          item,
          index, // Added 'index' as a second argument
        ) => (
          <div key={index} className="flex gap-2 py-3">
            {' '}
            {/* Added 'key' prop */}
            <BoxWrapper>
              <div className="rounded-full h-8 w-16 bg-blue flex items-center justify-center">
                <img src={job} alt="image" className="w-24 h-18 mr-2" />{' '}
                {/* Added image tag */}
              </div>
              <div className="pl-8">
                <span className="text-sm font-semibold">Job Available</span>
                <div className="flex items-center">
                  <strong className="text-xl font-bold">
                    {item.candidatesReview} Job Posted
                  </strong>
                </div>
              </div>
            </BoxWrapper>
            <BoxWrapper>
              <div className="rounded-full h-12 w-16 bg-dark-yellow flex items-center justify-center">
                <img src={interview} alt="image" className="w-24 h-18 mr-2" />{' '}
                {/* Added image tag */}
              </div>
              <div>
                <span className="text-sm font-semibold">Job Application</span>
                <div className="flex items-center">
                  <strong className="text-xl font-bold">
                    {item.toInterview} All Applicants
                  </strong>
                </div>
              </div>
            </BoxWrapper>
            <BoxWrapper>
              <div className="rounded-full h-12 w-16 bg-green flex items-center justify-center">
                <img src={messages} alt="image" className="w-24 h-18 mr-2" />{' '}
                {/* Added image tag */}
              </div>
              <div className="pl-4">
                <span className="text-sm font-semibold">
                  Archived Job Posts
                </span>
                <div className="flex items-center">
                  <strong className="text-xl font-bold">
                    {item.receivedMessages} Archived Jobs
                  </strong>
                </div>
              </div>
            </BoxWrapper>
          </div>
        ),
      )}
    </>
  )
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-md border border-gray rounded p-4 flex-1 flex items-center h-24">
      {children}
    </div>
  )
}
