import React from 'react';
import { Box, Stack, Typography, CssBaseline } from '@mui/material';
import SidebarAdm from '../global/Sidebar';
import StatComponent from '../../components/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from "react-google-charts";
import { data, options } from './data/data'
import ChartComponent from '../../components/ChartComponent';

// Importing Poppins font
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const AdminDashboard = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', backgroundColor: '#e7e8ea' }}> {/* Add a flex display for the layout */}
                <SidebarAdm /> {/* Render the SidebarAdm component */}
                <Box sx={{ flexGrow: 1 }}> {/* Add flexGrow for the main content */}
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h4" className="text-black pb-3">
                        Admin Dashboard
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                            <StatComponent
                                value="45621" 
                                icon={<SupervisorAccountIcon className="text-green-500 text-3xl" />}
                                description="Administrators"
                                money=''
                            />
                            <StatComponent
                                value="450"
                                icon={<WorkIcon className="text-green-500 text-3xl" />}
                                description="Jobs"
                                money=''
                            />
                            <StatComponent
                                value="6548"
                                icon={<CategoryIcon className="text-green-500 text-3xl" />}
                                description="Jobs categories"
                                money=''
                            />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} className="mt-3" spacing={{ xs: 1, sm: 2, md: 4 }}>
                            <ChartComponent>
                                <Chart
                                    chartType="Bar"
                                    data={data}
                                    options={options}
                                    width="100%"
                                    height="300px"
                                    legendToggle
                                />
                            </ChartComponent>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default AdminDashboard;
