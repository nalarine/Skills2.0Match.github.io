import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, Cell, Legend, PieChart, Pie } from 'recharts';

// Define colors with slightly muted shades
const COLORS = ['#B08CB2', '#A7C5A6', '#8AA5C5', '#D8A290', '#D3C690']; 

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ApplicantsSummary() {
  const [applicants, setApplicants] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
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
  }, [user._id]);

  const totalApplicants = applicants.length;

  // Group applicants by hiring stage
  const groupedApplicants = {};
  applicants.forEach(applicant => {
    if (!groupedApplicants[applicant.hiringStage]) {
      groupedApplicants[applicant.hiringStage] = [];
    }
    groupedApplicants[applicant.hiringStage].push(applicant);
  });

  const data = Object.entries(groupedApplicants).map(([hiringStage, applicants], index) => ({
    name: hiringStage,
    value: applicants.length,
    color: COLORS[index % COLORS.length], // Assign color based on index
  }));

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="bg-white w-[20rem] h-[6rem] p-4 flex flex-col rounded-md border border-gray">
        <strong className="font-semibold text-l">Current Opportunities</strong>
        <strong className="font-bold text-2xl py-1 text-dark-yellow">
          12 Open Positions
        </strong>
        </div>
        <div className="bg-white w-[20rem] h-[19rem] p-4 flex flex-col rounded-md border border-gray">
          <strong className="font-semibold text-l">
            Candidates Qualification
          </strong>
          <strong className="font-bold text-2xl py-1 text-blue">
            {/* {totalApplicants} Total Applicants */}
            Hiring Stage Summary
          </strong>
          <div className="w-full mt-1 flex-1 text-s">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="55%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="top" align="left" layout="horizontal" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
