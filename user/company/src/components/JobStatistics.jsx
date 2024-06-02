import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfWeek, endOfWeek, format, eachDayOfInterval, isSameDay } from 'date-fns';
import { apiRequest } from '../utils';

export default function JobStatistics() {
  const { user } = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [info, setInfo] = useState(null);
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchCompany = async () => {
      setIsLoading(true);
      try {
        const id = user?._id;
        const res = await apiRequest({
          url: '/companies/get-company/' + id,
          method: 'GET',
        });

        setInfo(res?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    const fetchApplicants = async () => {
      try {
        const res = await apiRequest({
          url: `/companies/get-company/${user._id}`,
          method: 'GET',
        })
        setApplicants(res.data.applicants)
      } catch (error) {
        console.error('Error loading company data:', error)
      }
    }

    fetchCompany();
    fetchApplicants();
  }, [user._id]);

  const currentWeekDates = eachDayOfInterval({
    start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
    end: endOfWeek(selectedDate, { weekStartsOn: 1 }),
  });

  const chartData = currentWeekDates.map((date) => {
    const formattedDate = format(date, 'EEE');
    // Filter job posts for the current date
    const jobPostsForDate = info?.jobPosts.filter(post => isSameDay(new Date(post.createdAt), date)) || [];
    // Filter applicants for the current date
    const applicantsForDate = applicants.filter(applicant => isSameDay(new Date(applicant.appliedDate), date)) || [];
    
    return {
      day: formattedDate,
      jobsPosted: jobPostsForDate.length,
      applicants: applicantsForDate.length
    };
  });

  return (
    <div className="bg-white h-[26rem] p-4 rounded-md border border-gray flex flex-col flex-1">
      <strong className="font-bold text-3xl">Job Statistics</strong>
      <span className="text-base text-gray">
        Showing job statistics for: 
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="MM/dd/yyyy"
          className="ml-2 border border-gray-300 rounded p-1"
          minDate={new Date(2020, 0, 1)} // Example: Set minDate to 2020-01-01
          maxDate={new Date(2025, 11, 31)} // Example: Set maxDate to 2025-12-31
        />
      </span>
      <span className="text-sm text-gray-500 mt-1">
        Select a date between {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), 'MM/dd/yyyy')} and {format(endOfWeek(selectedDate, { weekStartsOn: 1 }), 'MM/dd/yyyy')}
      </span>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="day" />
          <Tooltip />
          <Legend verticalAlign="top" align="left" />
          <Bar dataKey="jobsPosted" fill="#82ca9d" name="Jobs Posted">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={isSameDay(currentWeekDates[index], selectedDate) ? '#82ca9d' : '#eee'} // Highlight the bar if it corresponds to the selected date
              />
            ))}
          </Bar>
          <Bar dataKey="applicants" fill="#8884d8" name="Applicants">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-app-${index}`}
                fill={isSameDay(currentWeekDates[index], selectedDate) ? '#8884d8' : '#eee'} // Highlight the bar if it corresponds to the selected date
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
