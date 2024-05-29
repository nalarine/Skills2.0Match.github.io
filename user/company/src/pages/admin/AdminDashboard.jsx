import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/index';
import BuildingIcon from '../../assets/building.png';
import WorkIcon from '../../assets/work.png';
import UserIcon from '../../assets/user.png';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryLegend } from 'victory';

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
          { category: 'Companies', count: companiesResponse.data.length },
          { category: 'Jobs', count: jobsResponse.data.length },
          { category: 'Users', count: usersResponse.data.count },
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

  // Define a custom color palette for each category
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', fontFamily: 'Poppins', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>Admin Dashboard</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          {chartData.map(({ category, count }) => (
            <div key={category} style={{ width: '20%', textAlign: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <img src={category === 'Companies' ? BuildingIcon : category === 'Jobs' ? WorkIcon : UserIcon} alt={`${category} Icon`} width={80} height={80} style={{ marginBottom: '10px' }} />
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                <span>{count}</span>
                <span style={{ marginLeft: '5px', fontSize: '16px', color: '#666' }}>{category}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: '50%', margin: '50px 50px' }}>
        <VictoryChart domainPadding={50} height={300}>
            <VictoryLegend x={50} y={0}
              orientation="horizontal"
              gutter={20}
              data={chartData.map(({ category }) => ({ name: category }))}
              colorScale={colors}
            />
            <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />
            <VictoryAxis tickFormat={(x) => x} />
            <VictoryBar
              data={chartData}
              x="category"
              y="count"
              barRatio={0.8}
              style={{
                data: {
                  fill: ({ datum }) => colors[chartData.findIndex(({ category }) => category === datum.category)],
                },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              labels={({ datum }) => `${datum.category}: ${datum.count}`}
              labelComponent={<VictoryTooltip
                style={{ fontSize: 14, fill: 'white' }}
                flyoutStyle={{ fill: 'black', stroke: 'black', strokeWidth: 1 }}
              />}
            />
          </VictoryChart>
        </div>
        <div style={{ width: '33%', float: 'right', marginRight: '10%', marginTop: '-35%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#4A5568', fontSize: '18px', fontWeight: '600' }}>Registered Users</h2>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#718096' }}>Loading...</div>
          ) : (
            <div style={{ maxHeight: '240px', overflowY: 'auto', textAlign: 'left' }}>
              <Table>
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
