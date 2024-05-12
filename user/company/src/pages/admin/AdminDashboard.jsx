import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { apiRequest } from '../../utils/index';
import BuildingIcon from '../../assets/building.png';
import WorkIcon from '../../assets/work.png';
import UserIcon from '../../assets/user.png';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

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
      transform: 'translate(-10px, 0)',
    },
  },
};

const AdminDashboardChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

        console.log('Users Response:', usersResponse.data); // Log users data to console

        const chartData = [
          { category: 'Companies', count: companiesResponse.data.length, color: '#add8e6' },
          { category: 'Jobs', count: jobsResponse.data.length, color: '#90ee90' },
          { category: 'Users', count: usersResponse.data.count, color: '#b19cd9' },
        ];

        setChartData(chartData);
        setUsers(usersResponse.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: '102px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', fontFamily: 'Poppins', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>Admin Dashboard</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          {chartData.map(({ category, count, color }) => (
            <div key={category} style={{ width: '20%', textAlign: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <img src={category === 'Companies' ? BuildingIcon : category === 'Jobs' ? WorkIcon : UserIcon} alt={`${category} Icon`} width={80} height={80} style={{ marginBottom: '10px' }} />
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                <span>{count}</span>
                <span style={{ marginLeft: '5px', fontSize: '16px', color: '#666' }}>{category}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <BarChart
            dataset={chartData}
            xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
            series={[{ dataKey: 'count', label: 'Count', color: '#095c1d' }]}
            aria-label="Admin Dashboard Chart"
            {...chartSetting}
          />
        </div>
        <div className="mt-[-25%] w-1/3 float-right mr-[10%]">
          <h2 className="text-center mb-2 text-gray-800 text-lg font-semibold">Registered Users</h2>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="max-h-60 overflow-y-auto text-left">
              <Table border="collapse">
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.firstName} {user.lastName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardChart;
