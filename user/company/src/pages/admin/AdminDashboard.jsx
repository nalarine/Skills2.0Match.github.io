import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { apiRequest } from '../../utils/index';

const chartSetting = {
  yAxis: [
    {
      label: 'Count',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export default function AdminDashboardChart() {
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const companiesResponse = await apiRequest({
        url: '/companies/allcompanies',
        method: 'GET',
      });
      const jobsResponse = await apiRequest({
        url: '/jobs/alljobs',
        method: 'GET',
      });
      const usersResponse = await apiRequest({
        url: '/users/allusers',
        method: 'GET',
      });

      // Assuming the response contains data in the format: [{ month: 'Jan', count: 10 }, { month: 'Feb', count: 20 }, ...]

      const combinedData = mergeData(companiesResponse.data, jobsResponse.data, usersResponse.data);
      setChartData(combinedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Function to merge data from different API calls into a single dataset
  const mergeData = (companiesData, jobsData, usersData) => {
    const mergedData = [];
    // Iterate through each month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(month => {
      // Count the number of companies for this month
      const companiesCount = companiesData.filter(company => company.registrationDate.includes(month)).length;
      // Count the number of jobs for this month
      const jobsCount = jobsData.filter(job => job.createdMonth === month).length;
      // Count the number of users for this month
      const usersCount = usersData.filter(user => user.createdMonth === month).length;
      // Push the data for this month to the merged dataset
      mergedData.push({ month, companies: companiesCount, jobs: jobsCount, users: usersCount });
    });
    return mergedData;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: '102px' }}>
      <BarChart
        dataset={chartData}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'companies', label: 'Companies' },
          { dataKey: 'jobs', label: 'Jobs' },
          { dataKey: 'users', label: 'Users' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
